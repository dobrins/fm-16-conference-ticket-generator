import { z } from "zod";
import { MAX_SIZE } from "../constants/constants";

// SCHEMA

export const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(60, "Name is too long. Are you some kind of royalty?"),
  email: z.string().email("Invalid email address"),
  github: z
    .string()
    .min(1, "GitHub is required")
    .max(40, "Username too long. Are you committing your entire lineage?"),
  avatar: z
    .instanceof(File)
    .nullable()
    .refine((f) => f !== null, "Avatar is required")
    .refine(
      (f) => f === null || f.size <= MAX_SIZE,
      "File too large. Please upload a photo under 500KB.",
    )
    .refine(
      (f) => f === null || ["image/jpeg", "image/png"].includes(f.type),
      "Only JPG or PNG allowed",
    ),
});

export type FormFields = z.input<typeof schema>;
