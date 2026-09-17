"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  clearSensitiveFields,
  setSignUpField,
  signUpUser,
} from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { SuccessModal, TextField } from "./FormControls";

export function SignUpForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Controls the visibility of the account-created modal.
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Reads the sign-up form values from the Redux store.
  const fields = useAppSelector((state) => state.auth.signUp);

  // Reads the current request status and validation errors.
  const { loading, message, fieldErrors } = useAppSelector(
    (state) => state.auth.request,
  );

  // Submits the sign-up request and handles a successful response.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const result = await dispatch(signUpUser());

    if (signUpUser.fulfilled.match(result)) {
      // Remove password values from Redux after successful registration.
      dispatch(clearSensitiveFields());
      setShowSuccessModal(true);
    }
  }

  return (
    <>
      {/* Page heading */}
      <h1 className="form-heading">Sign Up</h1>

      <p className="form-subtitle">
        Manage your workspace seamlessly. Sign up to continue.
      </p>

      {/* Sign-up form */}
      <form onSubmit={handleSubmit} noValidate>
        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="navinash@workhive.com"
          value={fields.email}
          error={fieldErrors.email}
          onChange={(event) =>
            dispatch(
              setSignUpField({
                field: "email",
                value: event.target.value,
              }),
            )
          }
          required
        />

        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          value={fields.password}
          error={fieldErrors.password}
          onChange={(event) =>
            dispatch(
              setSignUpField({
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
          label="Confirm Password"
          type="password"
          placeholder="Repeat your password"
          value={fields.confirmPassword}
          error={fieldErrors.confirmPassword}
          onChange={(event) =>
            dispatch(
              setSignUpField({
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
          {loading ? "Creating account…" : "Sign Up"}
        </button>
      </form>

      {/* Link for existing users */}
      <p className="switch-copy">
        Already have an account?{" "}
        <Link className="text-link" href="/signin">
          Sign In
        </Link>
      </p>

      {/* Displayed after successful account creation */}
      {showSuccessModal && (
        <SuccessModal
          title="Account Created!"
          message={
            message ||
            "Your WorkHive account is ready. You can now sign in securely."
          }
          onClose={() => router.push("/signin")}
        />
      )}
    </>
  );
}