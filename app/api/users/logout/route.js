import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/components/lib/mongodb";
import { User } from "@/app/models/User.model";
import { ApiError } from "@/app/utils/ApiError";

export async function POST() {
    try {
        connectDB();
        const cookieMonster = await cookies();
        const refreshToken = cookieMonster.get("refreshToken");
    
        if (!refreshToken) throw new ApiError(400, "User is already logged out")
    
        await User.findOneAndUpdate(
            {refreshToken: refreshToken.value},
            {
                $set: {
                    refreshToken: undefined,
                },
            },
            {
                new: true,
            }
        );
    
        cookieMonster.delete('accessToken')
        cookieMonster.delete('refreshToken')
    
        return NextResponse.json({
            status: 200,
            message: "Logged Out User"
        })
    } catch (error) {
        throw new ApiError(500, error.message || "Something went wrong while logging out user")
    }
}
