import type { SVGProps } from "react";

export function CatBuddy(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M38 38c-2-10 2-18 9-22l7 9c2 2 5 2 7 0l7-9c7 4 11 12 9 22
           11 6 18 19 18 34 0 24-16 40-40 40S20 96 20 72c0-15 7-28 18-34Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48 74c0-7 6-12 12-12s12 5 12 12-6 12-12 12-12-5-12-12Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
      <path
        d="M40 88c0-5 4-9 9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M47 58c2-2 5-2 7 0M66 58c2-2 5-2 7 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M58 64c2 2 4 2 6 0"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M44 66c4 2 8 3 12 3M76 66c-4 2-8 3-12 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M42 62c0 3-3 5-6 5s-6-2-6-5 3-5 6-5 6 2 6 5Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M96 62c0 3-3 5-6 5s-6-2-6-5 3-5 6-5 6 2 6 5Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M92 78c12 6 10 18 1 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
