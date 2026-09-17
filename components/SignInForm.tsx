"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { signIn } from "next-auth/react";

import GoogleIcon from "@/components/icons/GoogleIcon";
import MicrosoftIcon from "@/components/icons/MicrosoftIcon";
import { TextField } from "@/components/FormControls";

import {
  setRememberMe,
  setSignInField,
  signInUser,
} from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function SignInForm() {
  const dispatch = useAppDispatch();

  // Reads the sign-in form values from the Redux store.
  const fields = useAppSelector((state) => state.auth.signIn);

  // Reads the current request status, messages, and validation errors.
  const request = useAppSelector((state) => state.auth.request);

  // Handles email and password sign-in.
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await dispatch(signInUser());
  }

  // Starts authentication with the selected OAuth provider.
  function handleOAuth(provider: "google" | "microsoft-entra-id") {
    void signIn(provider, {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <>
      {/* Page heading */}
      <h1 className="form-heading">Sign In</h1>

      <p className="form-subtitle">
        Manage your workspace seamlessly. Sign in to continue.
      </p>

      {/* Email and password sign-in form */}
      <form onSubmit={handleSubmit} noValidate className="relative">
        {/* Displays a request message for the sign-in action */}
        {request.name === "signIn" && request.message && (
          <div
            className="status-success absolute -top-9 left-0 z-10 w-full"
            role="status"
          >
            {request.message}
          </div>
        )}

        <TextField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="mail@workhive.com"
          value={fields.email}
          error={request.fieldErrors.email}
          onChange={(event) =>
            dispatch(
              setSignInField({
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
          placeholder="Enter your password"
          value={fields.password}
          error={request.fieldErrors.password}
          onChange={(event) =>
            dispatch(
              setSignInField({
                field: "password",
                value: event.target.value,
              }),
            )
          }
          required
        />

        {/* Additional sign-in options */}
        <div className="options">
          <label className="remember">
            <input
              name="remember"
              type="checkbox"
              checked={fields.rememberMe}
              onChange={(event) =>
                dispatch(setRememberMe(event.target.checked))
              }
            />
            Remember me
          </label>

          <Link className="text-link" href="/forgot-password">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="primary-button"
          disabled={request.loading}
        >
          {request.loading ? "Signing in…" : "Sign In"}
        </button>
      </form>

      {/* Separates password sign-in from social sign-in */}
      <div className="divider">or</div>

      {/* OAuth sign-in options */}
      <div className="social-stack">
        <button
          type="button"
          className="social-button"
          onClick={() => handleOAuth("google")}
        >
          <GoogleIcon />
          Sign in with Google
        </button>

        <button
          type="button"
          className="social-button"
          onClick={() => handleOAuth("microsoft-entra-id")}
        >
          <MicrosoftIcon />
          Sign in with Microsoft
        </button>
      </div>

      {/* Link for users who do not have an account */}
      <p className="switch-copy">
        Don&apos;t have an account?{" "}
        <Link className="text-link" href="/signup">
          Sign Up
        </Link>
      </p>
    </>
  );
}