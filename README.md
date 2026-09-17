# WorkHive Authentication

A responsive authentication flow built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit and NextAuth.

## Included

- Sign in and sign up screens
- Forgot password, six-digit OTP and password reset flow
- Success dialogs matching the supplied designs
- Mock route handlers with Zod validation and predictable error responses
- Google and Microsoft OAuth wiring through Auth.js
- Typed Redux Toolkit store for client-side authentication flow state
- Responsive desktop, tablet and mobile layouts
- Keyboard-friendly fields, semantic labels and accessible dialogs

## Architecture

- `app/**/page.tsx`: each auth page explicitly composes `AuthPageShell` and its form; no nested auth layout is used
- `components/`: reusable presentational forms and controls
- `hooks/`: client-side request state and reusable behaviour
- `store/`: Redux Toolkit store, typed hooks, auth-flow slice and `StoreProvider`
- `lib/`: API client and server-side validation helpers
- `app/api/`: mock request handlers

Reusable visual patterns are defined in Tailwind's `@layer components` with `@apply`, keeping JSX concise while still using Tailwind utilities, responsive variants and design tokens. NextAuth owns secure OAuth sessions, while Redux stores only non-sensitive interface state; passwords and tokens are never placed in Redux.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The mock OTP is `123456`. Use `error@workhive.com` on sign in to preview the authentication error.

## OAuth setup

Copy `.env.example` to `.env.local`, create an `AUTH_SECRET`, and add credentials for Google and/or Microsoft. In the provider console, use these callback URLs:

- Google: `http://localhost:3000/api/auth/callback/google`
- Microsoft: `http://localhost:3000/api/auth/callback/microsoft-entra-id`

Replace the hostname with the production deployment URL on Vercel. The OAuth buttons are present in the design; a provider becomes operational once its corresponding environment variables are configured.

## Mock API contract

All routes accept JSON and return a normalized response:

```json
{ "success": true, "message": "...", "data": {} }
```

Validation, authorization and server failures return an appropriate HTTP status:

```json
{ "success": false, "message": "...", "fieldErrors": { "email": "..." } }
```

Routes:

- `POST /api/auth/login`
- `POST /api/auth/signup`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`

This is a frontend demonstration. The mock handlers intentionally do not store passwords or issue application sessions.
