import type { SVGProps } from "react";

export default function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 12C4.6 7.9 7.8 5.75 12 5.75C16.2 5.75 19.4 7.9 21.5 12C19.4 16.1 16.2 18.25 12 18.25C7.8 18.25 4.6 16.1 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.75"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}