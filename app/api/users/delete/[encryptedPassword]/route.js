import connectDB from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ApiError } from "@/app/utils/ApiError";
import { cookies } from "next/headers";
import { User } from "@/app/models/User.model";
import { Todo } from "@/app/models/Todo.model";

export async function DELETE(_, { params }) {
    await connectDB();

    const cookieMonster = await cookies();
    const refreshToken = cookieMonster.get("refreshToken")?.value;
    const password = (await params).encryptedPassword 

    if (!refreshToken) throw new ApiError(401, "User is not logged in");

    const user = await User.findOne({
        refreshToken
    })
    console.log(user?.password);
    if (user?.password !== password) throw new ApiError(401, "The password doenst match the user's password")

    if (!user) throw new ApiError(404, "User not found")

    const deleteUser = await User.deleteOne({
        refreshToken
    })

    const hi = await Todo.deleteMany({
        owner: user
    })
    

    if (deleteUser?.deletedCount === 0) throw new ApiError(500, "Couldn't delete user")

    return NextResponse.json({status: 200, message: "User deleted successfully", details: deleteUser})
}
