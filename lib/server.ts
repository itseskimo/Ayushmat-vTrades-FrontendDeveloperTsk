import { NextResponse } from "next/server";
import { z } from "zod";

export function validate<T>(schema: z.ZodSchema<T>, input: unknown) {
  const parsed = schema.safeParse(input);
  if (parsed.success) return { data: parsed.data } as const;
  const fieldErrors = Object.fromEntries(
    parsed.error.issues.map((issue) => [
      String(issue.path[0] ?? "form"),
      issue.message,
    ]),
  );
  return {
    response: NextResponse.json(
      {
        success: false,
        message: "Please correct the highlighted fields.",
        fieldErrors,
      },
      { status: 400 },
    ),
  } as const;
}

export const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address.");
export const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.");
