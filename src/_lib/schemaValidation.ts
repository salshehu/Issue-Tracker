import { z } from "zod";

export const Issueschema = z.object({
  title: z.string().min(3, "Title must 3 chars long").max(255),
  description: z.string().min(1, "description can not be empty").max(65535),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional(),
  devId: z.string().optional(),
  dateCompleted: z.coerce.date().optional().nullable().default(null),
});

export const IssuesSchemaPatch = z.object({
  title: z
    .string()
    .min(3, "Title must 3 chars long")
    .max(255)
    .optional()
    .nullable(),
  description: z
    .string()
    .min(1, "description can not be empty")
    .max(65535)
    .optional()
    .nullable(),
  status: z.enum(["OPEN", "CLOSED", "IN_PROGRESS"]).optional().default("OPEN"),
  devId: z.string().optional(),
  dateCompleted: z.coerce.date().optional().nullable().default(null),
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

export const DevsSchema = z.object({
  userName: z.string().min(3).max(50),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
});

export const DevsSchemaPatch = z.object({
  userName: z.string().min(3).max(50).optional(),
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
});
