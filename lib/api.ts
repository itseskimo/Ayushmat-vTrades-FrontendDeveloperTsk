export type ApiResult<T = Record<string, never>> =
  | { success: true; message: string; data?: T }
  | { success: false; message: string; fieldErrors?: Record<string, string> };

/** Typed fetch wrapper shared by every form. It normalizes network and API errors. */
export async function postJson<T>(
  url: string,
  body: unknown,
): Promise<ApiResult<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response
      .json()
      .catch(() => ({
        success: false,
        message: "The server returned an invalid response.",
      }));
    if (!response.ok)
      return {
        success: false,
        message: payload.message ?? "Something went wrong.",
        fieldErrors: payload.fieldErrors,
      };
    return payload;
  } catch {
    return {
      success: false,
      message:
        "Unable to connect. Check your internet connection and try again.",
    };
  }
}
