import { User } from "@/app/models/User.model";
import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";

async function generateAccessAndRefreshTokens(id) {
    try {
        const user = await User.findById(id);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            error.message ||
                "Something went wrong while generating access and refresh token"
        );
    }
}

export async function POST(req) {
    await connectDB();
    const { email, username, password } = await req.json();
    // console.log(email, username);

    if (!email && !username) {
        throw new ApiError(400, "Username or Email is required");
    }

    const user = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const verify = await user.isPasswordCorrect(password);

    if (!verify) {
        throw new ApiError(401, "Invalid user credentials");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const response = NextResponse.json({
        status: 200,
        message: "User logged in successfully",
        user: loggedInUser
    });

    response.cookies.set("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
    });
    response.cookies.set("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
    });

    return response;
}
