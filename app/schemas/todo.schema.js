import z from "zod";

export const TodoSchema = z.string()
    .min(1, "Username must be not be empty")
    .max(150, "Todo must not be more than 150 characters")