import type { SVGProps } from "react";

export default function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M3 3L21 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.58 5.88C11.04 5.79 11.51 5.75 12 5.75C16.2 5.75 19.4 7.9 21.5 12C20.84 13.29 20.07 14.37 19.18 15.25M14.12 17.93C13.46 18.14 12.75 18.25 12 18.25C7.8 18.25 4.6 16.1 2.5 12C3.28 10.48 4.22 9.24 5.33 8.27"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99 9.99C9.53 10.49 9.25 11.16 9.25 12C9.25 13.52 10.48 14.75 12 14.75C12.84 14.75 13.51 14.47 14.01 14.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}