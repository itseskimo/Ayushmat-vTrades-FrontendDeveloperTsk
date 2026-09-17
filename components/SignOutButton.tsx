"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="primary-button max-w-40"
      // Ends the current session and redirects to the sign-in page.
      onClick={() => void signOut({ callbackUrl: "/signin" })}
    >
      Sign Out
    </button>
  );
}