import { z } from "zod";

export const signUpSchema = z
  .object({
    // Username should contain only alphanumeric characters and underscores
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores."),

    // Password must have at least one uppercase, one lowercase, one digit, and one special character
    password: z
      .string()
      .min(5, "Password must be at least 5 characters.")
      .regex(/[a-z]/, "One lowercase letter must be required.")
      .regex(/[A-Z]/, "One uppercase letter must be required.")
      .regex(/[0-9]/, "One digit must be required.")
      .regex(/[^a-zA-Z0-9]/, "One special character must be required."),

    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });
