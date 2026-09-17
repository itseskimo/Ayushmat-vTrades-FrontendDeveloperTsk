"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  clearSensitiveFields,
  setResetPasswordField,
  updatePassword,
} from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { SuccessModal, TextField } from "./FormControls";

export function ResetPasswordForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Controls the visibility of the password-updated modal.
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reads the new password values from the Redux store.
  const fields = useAppSelector(
    (state) => state.auth.resetPassword,
  );

  // Reads the current request status and validation errors.
  const { loading, message, fieldErrors } = useAppSelector(
    (state) => state.auth.request,
  );

  // Submits the new password and handles a successful response.
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const result = await dispatch(updatePassword());

    if (updatePassword.fulfilled.match(result)) {
      // Removes password values from Redux after a successful update.
      dispatch(clearSensitiveFields());
      setShowSuccessModal(true);
    }
  }

  return (
    <div className="centered-form">
      {/* Page heading */}
      <h1 className="form-heading">Create New Password</h1>

      <p className="form-subtitle">
        Choose a strong and secure password to keep your
        account safe. Make sure it&apos;s easy for you to
        remember, but hard for others to guess!
      </p>

      {/* New password form */}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Enter new password"
          value={fields.password}
          error={fieldErrors.password}
          onChange={(event) =>
            dispatch(
              setResetPasswordField({
                field: "password",
                value: event.target.value,
              }),
            )
          }
          required
        />

        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="Re-enter your password"
          type="password"
          placeholder="Repeat new password"
          value={fields.confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={(event) =>
            dispatch(
              setResetPasswordField({
                field: "confirmPassword",
                value: event.target.value,
              }),
            )
          }
          required
        />

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading ? "Updating…" : "Update Password"}
        </button>
      </form>

      {/* Displayed after the password is successfully updated */}
      {showSuccessModal && (
        <SuccessModal
          title="Password Created!"
          message={
            message ||
            "Your password has been successfully updated. You can now use your new password to sign in."
          }
          onClose={() => router.push("/signin")}
        />
      )}
    </div>
  );
}