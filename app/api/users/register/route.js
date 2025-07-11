import { User } from "@/app/models/User.model";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";
import { registerSchema } from "@/app/schemas/user.schema";
import { treeifyError } from "zod";

export async function POST(req) {
    await connectDB();
    const parsed = registerSchema.safeParse(await req.json());

    if (!parsed.success) {
        console.log(parsed.error);
        throw new ApiError(
            400,
            treeifyError(parsed.error)
        );
    }
    const { username, email, password } = parsed.data;

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser)
        throw new ApiError(409, "This username and email already exists");

    await User.create({
        username,
        email,
        password,
    });

    return NextResponse.json({ status: 200, message: "User Registered" });
}
