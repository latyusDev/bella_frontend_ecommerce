import { z } from "zod";

// Simple, permissive international phone check:
// optional leading +, then 7–15 digits, spaces/dashes/parentheses allowed.
const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  // .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[0-9]/, "Include at least one number")
  // .regex(/[^A-Za-z0-9]/, "Include at least one special character");

export const registerSchema = z.object({
  email: z
    .string()
    .min(5, "Email must be at least 5 characters.")
    .max(32, "Email must be at most 32 characters."),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters."),
  phone: z
    .string()
    .min(11, "Phone must be at least 11 characters.")
    .max(11, "Phone must be at most 11 characters."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
})


export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(5, "Email is required")
    .email("Enter a valid email address"),
  password: z.string().min(8, "Password is required"),
});

