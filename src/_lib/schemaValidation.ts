import { z } from "zod";

export const Issueschema = z.object({
  title: z.string().min(3, "Title must 3 chars long").max(255),
  description: z.string().min(1, "description can not be empty"),
});

export const RegisterFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(80),
  organisation: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email(),
  password1: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  password2: z.string(),
});
