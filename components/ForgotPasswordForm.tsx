"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  sendResetLink,
  setForgotEmail,
} from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { SuccessModal, TextField } from "./FormControls";

export function ForgotPasswordForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Controls the visibility of the reset-link confirmation modal.
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reads the user's email address from the Redux store.
  const email = useAppSelector(
    (state) => state.auth.forgotPassword.email,
  );

  // Reads the current request status and validation errors.
  const { loading, message, fieldErrors } = useAppSelector(
    (state) => state.auth.request,
  );

  // Sends the password-reset request and opens the success modal.
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const result = await dispatch(sendResetLink());

    if (sendResetLink.fulfilled.match(result)) {
      setIsModalOpen(true);
    }
  }

  return (
    <div className="centered-form">
      {/* Page heading */}
      <h1 className="form-heading">Forgot Your Password?</h1>

      <p className="form-subtitle">
        Don&apos;t worry! Enter your email address, and
        we&apos;ll send you a link to reset it.
      </p>

      {/* Password-reset request form */}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="navinash@workhive.com"
          value={email}
          error={fieldErrors.email}
          onChange={(event) =>
            dispatch(setForgotEmail(event.target.value))
          }
          required
        />

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Sending…" : "Submit"}
        </button>
      </form>

      {/* Returns the user to the sign-in page */}
      <Link className="back-link" href="/signin">
        ← Back to Sign In
      </Link>

      {/* Displayed after the reset request is successful */}
      {isModalOpen && (
        <SuccessModal
          title="Link Sent Successfully!"
          message={message}
          onClose={() => router.push("/verify-otp")}
        />
      )}
    </div>
  );
}