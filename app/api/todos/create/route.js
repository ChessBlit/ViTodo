import connectDB from "@/components/lib/mongodb";
import { NextResponse } from "next/server";
import { Todo } from "@/app/models/Todo.model";
import { ApiError } from "@/app/utils/ApiError";
import { User } from "@/app/models/User.model";
import { cookies } from "next/headers";
import { TodoSchema } from "@/app/schemas/todo.schema";
import { treeifyError } from "zod";

export async function POST(req) {
    try {
        await connectDB();
        const { content } = await req.json();
        const cookieMonster = await cookies();
        const refreshToken = cookieMonster.get("refreshToken")?.value;


        if (!refreshToken) throw new ApiError(401, "User is not Logged in");

        const checkContent = TodoSchema.safeParse({ content })

        if (!checkContent.success) throw new ApiError(400, treeifyError(checkContent.error))

        const user = await User.findOne({
            refreshToken,
        });

        if (!user) throw new ApiError(401, "Invalid session or user not found");

        const alreadyExists = await Todo.findOne({
            content,
            owner: user._id,
        });

        if (alreadyExists) throw new ApiError(409, "Todo already exists", "content");

        const todo = await Todo.create({
            content,
            owner: user._id,
        });

        user.todos.push(todo._id);
        await user.save();

        return NextResponse.json({
            status: 200,
            message: "Todo Created Successfully",
            todo,
        });
    }
    catch (error) {
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