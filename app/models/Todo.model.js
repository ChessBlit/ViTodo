import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
            index: true
        },

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        isCompleted: {
            type: Boolean,
            required: true,
            default: false,
            index: true
        }
    },
    { timestamps: true }
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
