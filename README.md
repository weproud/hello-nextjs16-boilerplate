# Hello Next.js 16 Boilerplate

A modern, production-ready starter for Next.js 16 (React 19) featuring:

- Authentication with Auth.js v5 (NextAuth) + Prisma Adapter (JWT sessions)
- PostgreSQL via Prisma ORM (typed client, migrations, and logging)
- Tailwind CSS v4 with OKLCH design tokens and theming (dark/light via next-themes)
- shadcn-style UI primitives (Button, Card, Avatar, Input, Textarea, etc.)
- TanStack React Form + Zod schema validation (bug report form demo)
- Biome for lightning-fast linting and formatting
- TypeScript strict mode with path aliases

This boilerplate includes a polished home page, a theme toggle, and feature demos for login and form validation.

## Table of Contents

- Features
- Tech Stack
- Prerequisites
- Quick Start
- Environment Variables
- Database (Prisma)
- Authentication
- Scripts
- Project Structure
- Deployment

## Features

- Next.js 16 App Router with server components
  - Home page: `/`
  - Feature demos: `/features/login`, `/features/form`
- Auth.js v5 (NextAuth) with Google OAuth
  - JWT sessions; role and displayName are added to token and session via callbacks
  - Prisma Adapter stores accounts, sessions, and users in PostgreSQL
  - Strongly-typed session and JWT via `src/types/types.d.ts`
- Tailwind CSS v4 theming setup
  - OKLCH color tokens and CSS variables in `src/app/globals.css`
  - Dark/light theme provided by `next-themes` and a `ThemeToggle` component
- UI components
  - `src/components/ui/*` includes Button, Card, Avatar, Input, Textarea, etc.
  - shadcn-style patterns built on Radix UI and class-variance-authority
- Forms & Validation
  - TanStack React Form + Zod demo (`/features/form`) with inline validation and error messages
- Notifications
  - Toasts via `sonner` (see the form and login pages)
- Code quality
  - Biome configured for linting and formatting (`biome.json`)

## Tech Stack

- Next.js 16.0.0
- React 19.2.0
- Auth.js v5 (next-auth@^5.0.0-beta)
- Prisma v6 (client and migrate)
- PostgreSQL
- Tailwind CSS v4
- Radix UI + class-variance-authority
- TanStack React Form
- Zod
- Biome

## Prerequisites

- Node.js 18 or later
- A PostgreSQL database (local or cloud such as Neon/Supabase)
  - macOS tip: you can install PostgreSQL via Homebrew (`brew install postgresql`)

## Quick Start

1) Clone the repository and install dependencies (choose one package manager):

```bash
# npm
npm install

# pnpm
pnpm install

# bun
bun install
```

2) Create an `.env.local` file in the project root and fill the required environment variables (see the next section).

3) Initialize the database and generate the Prisma client:

```bash
# Run migrations (creates tables)
npx prisma migrate dev

# Generate the Prisma client (outputs to src/generated/prisma)
npx prisma generate

# Optional: inspect your data with Prisma Studio
npx prisma studio
```

4) Start the development server:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# bun
bun dev
```

Open http://localhost:3000 to see the app.

## Environment Variables

Create `.env.local` with the following keys. Note: the provided Makefile expects `.env` (not `.env.local`) for its `env-check` task. You can either duplicate variables into `.env` or adjust the Makefile to read `.env.local`.

```env
# Required for Auth.js (NextAuth)
AUTH_SECRET=replace-with-a-strong-random-string

# Google OAuth credentials (from Google Cloud Console)
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret

# PostgreSQL connection string
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public

# Recommended for production environments
NEXTAUTH_URL=http://localhost:3000
```

Tips:
- Generate a strong secret on macOS: `openssl rand -base64 32`
- For Google OAuth, set the Authorized JavaScript origin to `http://localhost:3000` and the Authorized redirect URI to `http://localhost:3000/api/auth/callback/google`.

## Database (Prisma)

- Schema location: `prisma/schema.prisma`
- Client output: `src/generated/prisma` (import path in code: `@/generated/prisma/client`)
- Migrations: `prisma/migrations/*`
- Adapter: `@auth/prisma-adapter` integrates NextAuth with Prisma

Generator config in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

Tables:
- `users`: includes standard fields plus `display_name` and `latest_login_at`
- `accounts`, `sessions`, `verification_tokens`: standard NextAuth tables

Prisma Client initialization:
- See `src/lib/prisma.ts` for environment-based logging and a single-instance client with `globalThis` reuse in non-production.
- Logging levels:
  - development: ["warn", "error", "query", "info"]
  - test: []
  - production/other: ["warn", "error"]

## Authentication

- Configuration is split across:
  - `src/auth.ts`: NextAuth setup with Prisma Adapter, JWT sessions, callbacks, and sign-in event logging.
    - `callbacks.jwt`: persists `role` and `displayName` from the user onto the token.
    - `callbacks.session`: hydrates `session.user.role` and `session.user.displayName` from the token.
    - `events.signIn`: logs basic sign-in info.
  - `src/auth.config.ts`: registers Google provider and maps the remote profile to local fields (including a default `role: "USER"` and a derived `displayName`).
- API Route: `src/app/api/auth/[...nextauth]/route.ts` exports `{ GET, POST } = handlers` from `src/auth.ts`.
- Type augmentation: `src/types/types.d.ts` extends `Session` and `JWT` to include `role` and `displayName`.
- UI:
  - Login page: `/features/login` with `GoogleSigninButton` (server action) and `SignOutButton`.
  - `UserAvatar` displays the current user’s avatar, name, and displayName.

## Scripts

From `package.json`:

- `dev`: Start Next.js dev server
- `build`: Build the app
- `start`: Run the production server
- `lint`: Biome check
- `lint:fix`: Biome check with autofix
- `format`: Biome format write
- `format:check`: Biome format check
- `type-check`: TypeScript type checking
- `shadcn`: Add shadcn/ui components via Bun (`bunx --bun shadcn@latest add`)

### Makefile (optional automation)

The repository includes a `Makefile` to automate pre-deployment checks on macOS/Linux:

- `make done`: Runs install → prisma generate → migration status → format → lint-fix → type-check → build
- `make env-check`: Verifies `.env` contains required keys (`DATABASE_URL`, `AUTH_SECRET`)
- `make prisma-generate`: Runs `prisma generate` (outputs client to `src/generated/prisma`)
- `make prisma-migrate-status`: Checks current migration status
- `make format`, `make format-check`, `make lint`, `make lint-fix`, `make type-check`, `make build`

Note: The Makefile uses `.env`, while Next.js commonly uses `.env.local` for local development; ensure consistency by duplicating or adjusting.

## Project Structure

Key folders:

- `src/app/`
  - `layout.tsx`, `page.tsx`, `globals.css`
  - `features/login/page.tsx`, `features/form/page.tsx`
- `src/components/`
  - `home/` (Hero, TechStack, FeaturesSection, BackgroundPattern, Footer)
  - `ui/` (Button, Card, Avatar, Input, Textarea, ThemeToggle, Form helpers)
  - `auth/` (GoogleSigninButton, SignOutButton, UserAvatar)
- `src/lib/` (Prisma client, utilities)
- `src/types/` (Type augmentation for NextAuth v5)
- `prisma/` (Schema, migrations, config)

## Deployment

- This app is optimized for deployment on Vercel or any Node.js hosting.
- Ensure all environment variables are set in your hosting provider.
- Build with `npm run build` and run with `npm start` (or your chosen package manager).

## Notes

- Tailwind CSS v4 is configured with OKLCH tokens and custom variants in `globals.css`.
- A sample proxy utility (`src/proxy.ts`) demonstrates how to redirect/match routes; adapt it as middleware if needed.
- Path aliases are configured in `tsconfig.json` (`@/*` → `./src/*`).

## License

This template is provided as-is under your repository’s chosen license. If none is specified, treat this as unlicensed for personal use or adapt with your preferred license (e.g., MIT).
