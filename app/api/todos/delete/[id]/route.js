import connectDB from "@/components/lib/mongodb";
import { Todo } from "@/app/models/Todo.model";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";
import { User } from "@/app/models/User.model";
import { cookies } from "next/headers";
import mongoose from "mongoose";

export async function DELETE(_, { params }) {
    try {
        await connectDB();
        const refreshToken = (await cookies()).get("refreshToken")?.value;
        if (!refreshToken) throw new ApiError(401, "User is not logged in")
        const id = (await params).id;
        if (!mongoose.Types.ObjectId.isValid(id))
            throw new ApiError(400, "Invalid ObjectId");

        const deleteMeth = await Todo.deleteOne({ _id: id });
        
        if (deleteMeth.deletedCount === 0) throw new ApiError(404, "Todo not found")

        const user = await User.findOne({ refreshToken });
        if (!user) throw new ApiError(404, "User not found");

        user.todos.pull(id);
        await user.save();

        return NextResponse.json({
            status: 200,
            message: "Successfully deleted todo",
        });
    } catch (error) {
        throw new ApiError(
            500,
            error.message || "An error ouccured while deleting todo"
        );
    }
}
