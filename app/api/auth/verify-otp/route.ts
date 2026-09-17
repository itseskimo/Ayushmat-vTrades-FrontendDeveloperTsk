import { NextResponse } from "next/server";
import { z } from "zod";
import { validate } from "@/lib/server";
const schema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Enter the complete six-digit code."),
});
export async function POST(request: Request) {
  try {
    const result = validate(schema, await request.json());
    if ("response" in result) return result.response;
    if (result.data.otp !== "123456")
      return NextResponse.json(
        {
          success: false,
          message:
            "That verification code is invalid. Use 123456 for this demo.",
        },
        { status: 400 },
      );
    return NextResponse.json({ success: true, message: "Email verified." });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to verify the code." },
      { status: 500 },
    );
  }
}