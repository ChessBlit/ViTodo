import { cookies } from "next/headers";
import { ApiError } from "@/app/utils/ApiError";
import connectDB from "@/components/lib/mongodb";
import { User } from "@/app/models/User.model";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await connectDB();
        const cookieMonster = await cookies()
        const refreshToken = cookieMonster.get('refreshToken')?.value
    
        if (!refreshToken){
            return NextResponse.json({
                status: 200,
                loggedIn: false
            })
        }
    
        const user = await User.findOne({
            refreshToken
        })
    
        if (!user){
            throw new ApiError(404, "User not found")
        }
    
        return NextResponse.json({
            status: 200,
            loggedIn: true
        })
    } catch (error) {
        if (error instanceof ApiError){
            return error.toNextResponse()
        }

        return NextResponse.json({
            status: 500,
            message: "Faced Internal server error while fetching user"
        })
    }

}