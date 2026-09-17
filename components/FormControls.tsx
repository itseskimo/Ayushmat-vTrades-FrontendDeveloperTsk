"use client";

import { useState } from "react";
import MailIcon from "@/components/icons/MailIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeOffIcon from "@/components/icons/EyeOffIcon";

// Supports all standard input attributes and additional field properties.
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  action?: React.ReactNode;
};

export function TextField({
  label,
  error,
  action,
  type = "text",
  ...props
}: InputProps) {
  // Controls password visibility.
  const [visible, setVisible] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="field">
      {/* Field label and optional action */}
      <div className="field-row">
        <label className="label" htmlFor={props.id}>
          {label}
        </label>

        {action}
      </div>

      <div className="input-wrap">
        <input
          {...props}
          // Changes the input type when password visibility is toggled.
          type={isPassword && visible ? "text" : type}
          className={`input ${
            isPassword ? "password-input" : ""
          }`}
          aria-invalid={Boolean(error)}
          autoFocus
        />

        {/* Password visibility button */}
        {isPassword && (
          <button
            className="eye-button"
            type="button"
            aria-label={
              visible ? "Hide password" : "Show password"
            }
            onClick={() =>
              setVisible((currentValue) => !currentValue)
            }
          >
            {visible ? (
              <EyeOffIcon aria-hidden="true" />
            ) : (
              <EyeIcon aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Keeps space reserved for validation messages */}
      <p
        className={`error ${error ? "" : "invisible"}`}
        role={error ? "alert" : undefined}
      >
        <span className="error-icon" aria-hidden="true">
          !
        </span>
        {error || "No error"}
      </p>
    </div>
  );
}

type SuccessModalProps = {
  title: string;
  message: string;
  onClose: () => void;
};

export function SuccessModal({
  title,
  message,
  onClose,
}: SuccessModalProps) {
  return (
    // Prevents interaction with the page behind the modal.
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div className="modal">
        <div className="modal-icon" aria-hidden="true">
          <MailIcon/>
        </div>

        <h2 id="success-title">{title}</h2>
        <p>{message}</p>

        {/* Closes the modal and runs the parent's next action */}
        <button
          type="button"
          className="primary-button"
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </div>
  );
}