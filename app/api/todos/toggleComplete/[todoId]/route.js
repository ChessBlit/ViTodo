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
    const todoId = (await params).todoId
    console.log(todoId);

    const isValidId = mongoose.Types.ObjectId.isValid(todoId);
    if (!isValidId) {
        throw new ApiError(400, "Invalid Todo ID format");
    }

    if (!refreshToken) throw new ApiError(401, "User is not logged in");
    const user = await User.findOne({ refreshToken });
    if (!user) throw new ApiError(404, "User not found");

    const todo = await Todo.findById(todoId);
    console.log(todo);
    console.log(user);

    console.log(user._id, todo.owner);

    if (!todo) throw new ApiError(404, "Couldn't find todo");
    if (!(todo.owner.equals(user._id))) throw new ApiError(401, "Unauthorized access")

    todo.isCompleted = isCompleted;
    await todo.save();

    return NextResponse.json({
        status: 200,
        message: "Todo updated successfully",
    });
}
