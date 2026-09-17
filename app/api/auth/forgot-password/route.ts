import { NextResponse } from "next/server";
import { z } from "zod";
import { emailSchema, validate } from "@/lib/server";
const schema = z.object({ email: emailSchema });
export async function POST(request: Request) {
  try {
    const result = validate(schema, await request.json());
    if ("response" in result) return result.response;
    return NextResponse.json({
      success: true,
      message: "Password reset instructions have been sent.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to send the reset email." },
      { status: 500 },
    );
  }
}
