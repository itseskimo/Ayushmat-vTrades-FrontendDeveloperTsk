import { NextResponse } from "next/server";
import { z } from "zod";
import { emailSchema, passwordSchema, validate } from "@/lib/server";

const schema = z.object({ email: emailSchema, password: passwordSchema });

export async function POST(request: Request) {
  try {
    const result = validate(schema, await request.json());
    if ("response" in result) return result.response;
    // Mock rejection path for demonstrating production-style error handling.
    if (result.data.email === "error@workhive.com")
      return NextResponse.json(
        {
          success: false,
          message: "The email address or password is incorrect.",
        },
        { status: 401 },
      );
    return NextResponse.json({
      success: true,
      message: "Signed in successfully.",
      data: { user: { email: result.data.email } },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to process the request." },
      { status: 500 },
    );
  }
}
