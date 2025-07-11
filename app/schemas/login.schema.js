import z from "zod";

export const LoginSchema = z.object({
    usernameOrEmail: z.string().min(1, "This field must not be empty"),
    password: z.string()
            .min(1, "password must not be empty")
})