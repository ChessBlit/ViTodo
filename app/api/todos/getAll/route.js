import connectDB from "@/components/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";
import { User } from "@/app/models/User.model";
import { cookies } from "next/headers";
import { Todo } from "@/app/models/Todo.model";

export async function POST() {
    try {
        await connectDB();
        const cookieMonster = await cookies();
        const refreshToken = cookieMonster.get("refreshToken")?.value;
    
        if (!refreshToken) throw new ApiError(401, "User is not logged in");
    
        const user = await User.findOne({
            refreshToken,
        });
        
    
        const todoIds = await user.todos;
    
        const todos = await Promise.all(
            todoIds.map(async (todoId) => {
                return await Todo.findById(todoId);
            })
        );
    
    
        return NextResponse.json({
            status: 200,
            message: "All todos fetched",
            todos,
        });
    } catch (error) {
        if (error instanceof ApiError){
            return error.toNextResponse()
        }

        return NextResponse.json({
            status: 500,
            message: "Internal server error while fetching todos"
        })
    }
}
