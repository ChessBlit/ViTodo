import z from "zod";

export const TodoSchema = z.object({
    content: z.string()

        .min(1, "Todo content must not be empty")
        .max(150, "Todo must not be more than 150 characters"),
    priority: z.union([
    z.string(),
    z.number().min(1).max(3),
  ])
  .default(1)
})