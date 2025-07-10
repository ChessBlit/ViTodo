import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongodb";
import { Todo } from "@/app/models/Todo.model";
import { User } from "@/app/models/User.model";
import { ApiError } from "@/app/utils/ApiError";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function PATCH(req, { params }) {
    await connectDB();
    const cookieMonster = await cookies();
    const refreshToken = cookieMonster.get("refreshToken")?.value;
    const { isCompleted } = await req.json();
    const todoId = params.todoId 

    const isValidId = mongoose.Types.ObjectId.isValid(todoId);
    if (!isValidId) {
        throw new ApiError(400, "Invalid Todo ID format");
    }

    if (!refreshToken) throw new ApiError(401, "User is not logged in");

    const todo = await Todo.findById(todoId);
    if (!todo) throw new ApiError(404, "Couldn't find todo");

    todo.isCompleted = isCompleted;
    await todo.save();
    const user = await User.findOne({ refreshToken });
    if (!user) throw new ApiError(404, "User not found");

    return NextResponse.json({
        status: 200,
        message: "Todo updated successfully",
    });
}
