import { z } from "zod";

export const Issueschema = z.object({
  title: z.string().min(3, "Title must 3 chars long").max(255),
  description: z.string().min(1, "description can not be empty"),
});
