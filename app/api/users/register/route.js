import { User } from "@/app/models/User.model";
import connectDB from "@/components/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";
import { registerSchema } from "@/app/schemas/user.schema";
import { treeifyError } from "zod";

export async function POST(req) {
    try {
        await connectDB();
        const parsed = registerSchema.safeParse(await req.json());

        if (!parsed.success) {
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
            throw new ApiError(409, "This username or email already exists", ["email", "username"]);

        await User.create({
            username,
            email,
            password,
        });

        return NextResponse.json({ status: 200, message: "User Registered" });
    } catch (error) {
        if (error instanceof ApiError) {
            return error.toNextResponse();
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error",
            },
            { status: 500 }
        );
    }
}
