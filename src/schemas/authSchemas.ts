import * as z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email format!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .regex(/[\W_]/, {
      message: "Password must contain at least one special character!",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Invalid email format!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
});
