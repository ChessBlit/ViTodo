import z from "zod";
export const registerSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters"),
  email: z.email(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/,
           "Password must include uppercase, lowercase, number, and special character")
});