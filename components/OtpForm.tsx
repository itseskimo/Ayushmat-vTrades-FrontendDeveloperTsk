"use client";

import {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { setOtpDigit, verifyOtp } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function OtpForm() {
  const dispatch = useAppDispatch();

  // Stores references to OTP inputs for automatic focus control.
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Tracks the remaining OTP countdown time.
  const [seconds, setSeconds] = useState(30);

  // Reads the individual OTP digits from the Redux store.
  const digits = useAppSelector((state) => state.auth.otp);

  // Reads the email address entered on the forgot-password page.
  const email = useAppSelector(
    (state) => state.auth.forgotPassword.email,
  );

  // Reads the current OTP verification status.
  const { loading, error } = useAppSelector(
    (state) => state.auth.request,
  );

  // Decreases the countdown by one every second.
  useEffect(() => {
    if (seconds === 0) return;

    const timer = setTimeout(() => {
      setSeconds((currentSeconds) => currentSeconds - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  // Accepts one numeric digit and focuses the next input.
  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, "").slice(-1);

    dispatch(setOtpDigit({ index, value: digit }));

    if (digit && index < digits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Moves focus to the previous input when deleting an empty digit.
  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    const shouldFocusPreviousInput =
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0;

    if (shouldFocusPreviousInput) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  // Verifies the OTP and opens the reset-password page.
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const result = await dispatch(verifyOtp());

    if (verifyOtp.fulfilled.match(result)) {
      location.assign("/reset-password");
    }
  }

  return (
    <div className="centered-form">
      {/* Page heading */}
      <h1 className="form-heading">Enter OTP</h1>

      <p className="form-subtitle">
        Enter the OTP that has been sent to your email
        address
        <br />
        {email || "sampleuser@gmail.com"}.
      </p>

      {/* Returns the user to the email entry page */}
      <button
        type="button"
        className="text-link link-button"
        onClick={() => location.assign("/forgot-password")}
      >
        Change Email Address
      </button>

      {/* OTP verification form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="otp-row">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className="input otp-input"
              value={digit}
              inputMode="numeric"
              maxLength={1}
              autoComplete={
                index === 0 ? "one-time-code" : "off"
              }
              aria-label={`OTP digit ${index + 1}`}
              aria-invalid={Boolean(error)}
              onChange={(event) =>
                handleChange(index, event.target.value)
              }
              onKeyDown={(event) =>
                handleKeyDown(index, event)
              }
            />
          ))}
        </div>

        {/* OTP verification error */}
        {error && (
          <p className="error absolute top-12" role="alert">
            <span className="error-icon" aria-hidden="true">
              !
            </span>
            {error}
          </p>
        )}

        {/* Remaining verification time */}
        <div className="timer">◷ {seconds}s</div>

        <button
          type="submit"
          className="primary-button"
          disabled={loading || digits.includes("")}
        >
          {loading ? "Verifying…" : "Continue"}
        </button>
      </form>
    </div>
  );
}