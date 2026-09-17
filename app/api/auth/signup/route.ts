import { NextResponse } from "next/server";
import { z } from "zod";
import { emailSchema, passwordSchema, validate } from "@/lib/server";

const schema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
export async function POST(request: Request) {
  try {
    const result = validate(schema, await request.json());
    if ("response" in result) return result.response;
    return NextResponse.json(
      { success: true, message: "Account created successfully." },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to create your account." },
      { status: 500 },
    );
  }
}