# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TuChanchito is a progressive web application (PWA) for tracking personal expenses and income. It's built with Next.js 15, TypeScript, Prisma ORM with PostgreSQL, NextAuth.js for authentication, and uses shadcn/ui components with Tailwind CSS.

## Development Commands

- `npm run dev` - Start development server with Turbo (http://localhost:3000)
- `npm run build` - Build the application (includes Prisma generate)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run lint:prettier` - Check Prettier formatting

## Database Commands

- `npm run prisma:migration` - Run Prisma migrations in development
- `npm run prisma:publish` - Push schema to database
- `npm run prisma:seed` - Seed the database
- `prisma generate` - Generate Prisma client (auto-runs on install/build)

## Architecture

### Database Schema

The application uses PostgreSQL with Prisma ORM. Key models:

- `Transaction` - Core financial records with amount (Decimal), type (INCOME/EXPENSE), category, currency
- `User` - User accounts with NextAuth.js integration, supporting Google OAuth and custom auth
- `Account` - NextAuth.js accounts table for provider management

### Authentication

- NextAuth.js with Google OAuth provider
- JWT strategy with custom callbacks to include user ID in session
- Prisma adapter for database persistence
- Auth utilities in `src/utils/auth.ts` with `withAuth` HOC for protected operations

### File Structure

- `src/app/` - Next.js 15 app router with route groups
  - `(pwa)/` - Main PWA routes (dashboard, transactions, home)
  - `api/auth/` - NextAuth.js API routes
- `src/components/` - All UI components organized by type
  - `ui/` - Reusable UI primitives (buttons, inputs, forms)
  - `features/` - Business logic components (transaction-form, navigation, data-table)
- `src/lib/` - Core utilities and services
  - `services/transactions.ts` - Transaction business logic with auth protection
  - `repositories/` - Database access layer with proper error handling
  - `constants.ts` - Application constants and enums
  - `errors.ts` - Custom error classes
  - `logger.ts` - Structured logging utility
  - `prisma.ts` - Database client
- `src/utils/` - Utility functions (auth, dates, numbers, etc.)

### Key Patterns

- **Repository Pattern**: Database operations are isolated in `src/lib/repositories/` with proper error handling
- **Service Layer**: Business logic in `src/lib/services/` wrapped with `withAuth()` for user isolation
- **Error Handling**: Custom error classes with structured logging using `logger.ts`
- **Constants Management**: Centralized constants in `src/lib/constants.ts` for maintainability
- **Component Organization**: UI primitives separated from feature components
- Transaction amounts are stored as Decimal in DB but converted to strings for frontend display
- PWA-ready with manifest and optimized for mobile use
- Uses server actions pattern for form submissions and data mutations
- Chart components use Recharts library for data visualization

### Environment Variables

Required for development:

- `POSTGRES_PRISMA_URL` - Connection pooling URL
- `POSTGRES_URL_NON_POOLING` - Direct connection URL
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `AUTH_SECRET` - NextAuth.js secret

### Transaction Categories

Fixed enum: LEISURE, HEALTH, HOME, SUBSCRIPTIONS, CAR, FOOD, SAVINGS, EDUCATION, TRAVEL, WORK, MISCELLANEOUS

### Currencies

Supported: ARS (default), BTC, USD, USDT

## Code Quality

- Husky pre-commit hooks with lint-staged and Prettier
- Commitlint with conventional commits
- ESLint with Next.js config
- TypeScript strict mode enabled

## RULES

- NEVER write code without concrete functionality
- NEVER mention Claude in commits
- ALWAYS apply ESLint + Prettier
