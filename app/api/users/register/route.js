import { User } from "@/app/models/User.model";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";

export async function POST(req) {
    await connectDB();
    const { username, email, password } = await req.json();

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser)
        throw new ApiError(409, "This username and email already exists");

    if (username === "" || email === "" || password === "")
        throw new ApiError(400, "All fields are required");

    await User.create({
        username,
        email,
        password,
    });

    return NextResponse.json({ staus: 200, message: "User Registered" });
}