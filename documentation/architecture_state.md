# Architecture State — Jamea (جامعة) EdTech Platform

> **Audience:** Senior Engineers onboarding to this repository.  
> **Last Updated:** 2026-05-06  
> **Status:** Active Development — Auth, Dashboard, full Journey module, and Color Mixer Game complete.

---

## 1. Project Overview

Jamea is a bilingual (Arabic/English) EdTech platform built for homeschooling families. It serves three distinct user personas whose concerns are strictly separated at every layer of the stack:

| Persona | Arabic | Primary Concern |
|---------|--------|-----------------|
| **Parent** | الوالد / الوالدة | Account owner. Creates child sub-accounts, controls course approvals, monitors progress. Authenticates via email magic link or Google OAuth. |
| **Student** | الطالب / الطالبة | Child sub-account. Authenticates via a 6-character code (+ optional PIN) issued by the parent. No email required. |
| **Teacher** | المعلم / المعلمة | Content author and class manager. Authenticates via email. Scope-limited to assigned classes. |

**Bilingual Requirement:** The entire UI must support both RTL (Arabic, `dir="rtl"`) and LTR (English, `dir="ltr"`) rendering. Layout, typography, and all interactive components are RTL-first. The `dir` attribute is set at the `<html>` level via a `jamea-lang` cookie read server-side in the root layout. No mirrored asset duplication — CSS logical properties (`margin-inline-start`, `padding-inline-end`, `ps-*`, `pe-*`, `ms-*`, `me-*`) are used throughout.

---

## 2. The Tech Stack

### 2.1 Backend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | NestJS | 11.x | Modular server-side application framework |
| Language | TypeScript | 5.7.x | Strict typing across all modules |
| Auth — OAuth/Magic Link | `@nestjs/passport` + `passport-jwt` | 11.0.5 / 4.0.1 | Validates Supabase-issued tokens; issues platform JWTs |
| Auth — JWT issuance | `@nestjs/jwt` | 11.0.2 | Signs and verifies short-lived platform JWTs |
| API Documentation | `@nestjs/swagger` | 11.4.1 | Auto-generates OpenAPI spec served at `/api/docs` |
| Validation | `class-validator` + `class-transformer` | 0.15.1 / 0.5.1 | DTO-level input validation via decorators |
| Supabase Client | `@supabase/supabase-js` | 2.104.1 | Service-role admin client for server-side DB operations |
| HTTP Server | `@nestjs/platform-express` | 11.x | Express adapter |

### 2.2 Frontend

| Layer | Technology | Actual Version | Purpose |
|-------|-----------|----------------|---------|
| Framework | Next.js (App Router) | **16.2.4** | RSC, server actions, route handlers |
| Runtime | React | **19.2.4** | UI rendering |
| Language | TypeScript | ^5 | Strict typing |
| Styling | Tailwind CSS | **v4** | Utility-first; font switching via `[dir]` CSS selector |
| Supabase SSR | `@supabase/ssr` | ^0.10.2 | Cookie-based session for browser + server |
| Supabase JS | `@supabase/supabase-js` | ^2.105.3 | Typed DB/Auth client |
| State management | Zustand | ^5.0.13 | Auth store with `localStorage` persistence |
| Icons | lucide-react | ^1.14.0 | UI icons |
| Fonts | Cairo (Arabic) + Geist (Latin) | Google Fonts | Loaded via `next/font/google` as CSS variables |

### 2.3 Database & Auth

| Layer | Technology | Notes |
|-------|-----------|-------|
| Database | Supabase (PostgreSQL 15) | Managed. All tables in `public` schema. |
| Row-Level Security | Supabase RLS | Enforced on every table. No client can bypass. |
| Real-time | Supabase Realtime | Used for live parent ↔ student progress events |
| Auth Provider | Supabase Auth | Google OAuth + magic link for adults; code-based for students (custom RPC) |
| Schema Migrations | Supabase CLI / SQL Editor | Migration files in `supabase/migrations/` |

---

## 3. Frontend Architecture — Feature-Sliced Design

### 3.1 Actual Directory Structure (current state)

```
frontend/
├── public/
│   └── logo-optimized.png                    # ✅ Brand logo used across all pages
├── src/
│   ├── app/                                  # Next.js App Router — routing ONLY
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx                  # ✅ Adult login page (split screen)
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts                  # ✅ Supabase OAuth/magic-link PKCE handler
│   │   ├── dashboard/
│   │   │   └── page.tsx                      # ✅ Post-login hub — journey selector + auth guard
│   │   ├── journey/
│   │   │   └── arabic/
│   │   │       ├── page.tsx                  # ✅ Gamified map — phases + letter/stage nodes
│   │   │       ├── [stage]/
│   │   │       │   └── page.tsx              # ✅ Dynamic stage page (sukoon, madd, shadda…)
│   │   │       ├── color-mixer/
│   │   │       │   └── page.tsx              # ✅ Color Mixer Game route
│   │   │       ├── letter/
│   │   │       │   └── [id]/
│   │   │       │       └── page.tsx          # ✅ Letter deep-dive (13 interactive sections)
│   │   │       ├── reading/
│   │   │       │   └── page.tsx              # ✅ Reading stages module
│   │   │       └── verb-lab/
│   │   │           └── page.tsx              # ✅ Verb conjugation lab
│   │   ├── parent/
│   │   │   └── page.tsx                      # ✅ Parent account management
│   │   ├── favicon.ico
│   │   ├── globals.css                       # ✅ Base CSS + celebration keyframes
│   │   ├── main.css                          # ✅ Platform-wide custom styles
│   │   ├── verb-lab.css                      # ✅ Verb Lab-specific styles
│   │   ├── page.module.css
│   │   ├── layout.tsx                        # ✅ Root layout — Noto Naskh + Tajawal, AppProvider
│   │   └── page.tsx                          # ✅ Landing / entry screen
│   │
│   ├── components/                           # Presentational components (no business logic)
│   │   ├── LetterSections/
│   │   │   ├── LetterDetective.tsx           # ✅ Spot-the-letter game
│   │   │   ├── MemoryGame.tsx                # ✅ Flip-card memory game
│   │   │   ├── MissingWordGame.tsx           # ✅ Fill-the-gap exercise
│   │   │   ├── MotorsSection.tsx             # ✅ Vowel diacritics (harakat) audio drill
│   │   │   ├── SpeedReadGame.tsx             # ✅ Timed reading challenge
│   │   │   ├── SpinWheelGame.tsx             # ✅ Spin & read syllable wheel
│   │   │   └── XOWordGame.tsx                # ✅ Syllable / word XO game
│   │   ├── Navigation/
│   │   │   └── AppNav.tsx                    # ✅ Persistent top nav (stars, name, tools, sign-out)
│   │   ├── ReadingStages/
│   │   │   ├── ReadingStageLesson.tsx        # ✅ Lesson card for a reading stage
│   │   │   ├── SentenceBuilder.tsx           # ✅ Drag / tap sentence construction
│   │   │   ├── SyllableExercise.tsx          # ✅ Syllable reading exercise
│   │   │   └── WordReadExercise.tsx          # ✅ Word reading drill
│   │   ├── SpecialLesson/
│   │   │   └── SpecialLessonPanel.tsx        # ✅ Quran / special lesson panel
│   │   ├── StageSections/
│   │   │   ├── StageDetectiveSection.tsx     # ✅ Detective mini-game for diacritics
│   │   │   ├── StageHero.tsx                 # ✅ Stage banner with title + progress
│   │   │   ├── StageMissingMarkGame.tsx      # ✅ Missing diacritic game
│   │   │   ├── StageMotorsSection.tsx        # ✅ Diacritic audio section for a stage
│   │   │   ├── StageQuestionTools.tsx        # ✅ Inline question cards
│   │   │   └── StageScreen.tsx               # ✅ Stage page shell — assembles all sections
│   │   ├── Tools/
│   │   │   ├── GrammarRules.tsx              # ✅ Slide-in grammar reference panel
│   │   │   ├── QuranPuzzle.tsx               # ✅ Quranic verse puzzle tool
│   │   │   ├── ToolsOverlay.tsx              # ✅ Global floating tools drawer
│   │   │   └── WordBuilder.tsx               # ✅ Interactive word-building tool
│   │   └── VerbLab/
│   │       ├── VerbConjugation.tsx           # ✅ Conjugation table display
│   │       ├── VerbQuiz.tsx                  # ✅ Conjugation quiz
│   │       └── VerbStory.tsx                 # ✅ Story mode using target verbs
│   │
│   ├── context/
│   │   └── AppContext.tsx                    # ✅ Global state: auth, stars, theme, language, modals
│   │
│   ├── data/                                 # Static content data — no network calls
│   │   ├── db.ts                             # ✅ ARABIC_LETTERS, FULL_DB, CONNECTION_RULES, QURAN_VERSES
│   │   ├── maddData.ts                       # ✅ Long-vowel (madd) stage content
│   │   ├── readingData.ts                    # ✅ Reading stages lesson data
│   │   ├── shaddaData.ts                     # ✅ Shadda (gemination) stage content
│   │   ├── stageData.ts                      # ✅ STAGE_DATA map (sukoon|madd|shadda|tanween)
│   │   ├── sukoonData.ts                     # ✅ Sukoon (rest mark) stage content
│   │   ├── tanweenData.ts                    # ✅ Tanween stage content
│   │   └── verbLabData.ts                    # ✅ Verb conjugation tables + stories
│   │
│   ├── features/
│   │   ├── auth/                             # ✅ Auth feature — complete
│   │   │   ├── api.ts                        # loginAdult(), loginStudent()
│   │   │   ├── components/
│   │   │   │   └── AdultLoginForm.tsx        # Google OAuth + magic-link form
│   │   │   ├── store.ts                      # Zustand store (localStorage persist)
│   │   │   └── types.ts                      # AuthUser, JameaRole, response DTOs
│   │   └── journey/
│   │       └── components/
│   │           └── ColorMixerGame.tsx        # ✅ Color Mixer Game (3-level, RTL, Tailwind v4)
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   └── client.ts                     # ✅ Typed fetch wrapper + ApiError
│   │   ├── speech.ts                         # ✅ speakAr() — Web Speech API wrapper for Arabic TTS
│   │   ├── supabase.ts                       # ✅ Singleton Supabase client (legacy import path)
│   │   └── supabase/
│   │       ├── client.ts                     # ✅ Browser Supabase client (@supabase/ssr)
│   │       └── server.ts                     # ✅ Server Supabase client (Next.js cookies)
│   │
│   └── types/
│       └── letter.ts                         # ✅ Letter TypeScript interfaces
│
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

**Legend:** ✅ Complete

> **Root Layout Change (2026-05-06):** `src/app/layout.tsx` was updated to use `Noto_Naskh_Arabic` (body text) and `Tajawal` (headings) fonts via `next/font/google`, replacing the earlier Cairo+Geist pair. The layout is now hardcoded `lang="ar" dir="rtl"` and wraps children in `<AppProvider>` (global state), `<AppNav>` (persistent navigation), and `<ToolsOverlay>` (floating tools drawer). Font Awesome 6 is loaded from CDN for icons; Phaser 3 is loaded asynchronously from CDN for future game integrations.

### 3.2 The Feature Boundary Rule

> **Rule:** Business logic — API calls, derived state, access control checks, form submission handlers — is written **exclusively** inside `features/`. Components in `components/` receive data and callbacks as props and render nothing domain-specific.

| Allowed in `components/` | Forbidden in `components/` |
|--------------------------|---------------------------|
| Tailwind styling | `fetch()` or API client calls |
| Conditional rendering based on props | Role checks (`if role === 'parent'`) |
| Animation triggers | Navigation side-effects |
| Accessible ARIA markup | Supabase client imports |

---

## 4. Backend Architecture — NestJS Modules

### 4.1 Module Map (current state)

```
backend/src/
├── main.ts                       # Bootstrap: global prefix /api, Swagger, ValidationPipe, CORS
├── app.module.ts                 # Root module; imports all feature modules
│
├── auth/
│   ├── auth.service.ts           # loginWithSupabaseToken(), loginWithStudentCode()
│   ├── jwt.strategy.ts           # Passport JWT strategy — validates platform JWT
│   └── jwt-auth.guard.ts         # @UseGuards(JwtAuthGuard) on protected routes
│
└── supabase/
    ├── supabase.module.ts        # Global module; exports SupabaseService
    └── supabase.service.ts       # .db (anon) and .adminDb (service-role) clients + verifyToken()
```

### 4.2 Key Bootstrap Config (`main.ts`)

```typescript
app.setGlobalPrefix('api')                // All routes live under /api/*
app.enableCors({ origin: FRONTEND_URL })  // env: FRONTEND_URL
app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
// Swagger: http://localhost:3001/api/docs
```

> **Note:** The global `/api` prefix means all NestJS routes are `/api/auth/login`, `/api/auth/student-login`, etc. The frontend API client at `src/lib/api/client.ts` currently uses `NEXT_PUBLIC_API_URL` as the full base — route paths in `features/auth/api.ts` must include `/api/` prefix or the base URL must include it.

### 4.3 Planned Module Expansion

```
backend/src/
├── users/                        # Profile CRUD, role assignment
├── children/                     # Child sub-account management (parent-scoped)
├── progress/                     # Student progress read/write
├── courses/                      # Content metadata and course approval flow
└── admin/                        # Super-admin operations (audit log, user bans)
```

### 4.4 Request Lifecycle

```
HTTP Request
    │
    ▼
NestJS Global ValidationPipe          ← Rejects malformed DTOs before controllers
    │
    ▼
JwtAuthGuard (Passport)               ← Verifies platform JWT; populates req.user
    │                                    { sub, email?, role?, studentCode? }
    ▼
Controller                            ← Thin: extracts params, calls service
    │
    ▼
Service                               ← Business logic; calls SupabaseService
    │
    ▼
SupabaseService.adminDb               ← Service-role client bypasses RLS
    │                                    (used only for trusted server operations)
    ▼
Supabase PostgreSQL
```

### 4.5 Auth Flows

#### Flow A — Parent / Teacher (OAuth / Magic Link)

```
1. Client completes Supabase Auth (Google OAuth or magic link)
   └── Browser is redirected to /auth/callback
2. app/auth/callback/route.ts calls supabase.auth.exchangeCodeForSession(code)
   └── Session cookie is set; browser redirected back to /login
3. AdultLoginForm.tsx — onAuthStateChange fires SIGNED_IN
   └── Extracts session.access_token
4. Calls POST /api/auth/login { token: supabaseToken }
5. AuthService.loginWithSupabaseToken():
   a. SupabaseService.verifyToken(token) → calls admin.auth.getUser(token)
   b. Reads role from user_metadata
   c. Signs and returns a short-lived platform JWT
6. Client calls useAuthStore.setAuth(user, token)
7. router.replace('/dashboard') if parent, '/teacher' if teacher
```

#### Flow B — Student (Code Login)

```
1. Parent provides child with a 6-char code (e.g. "ABCD12")
2. Student enters code on login screen
3. Client calls POST /api/auth/student-login { code }
   └── Code normalized to UPPERCASE.trim() in features/auth/api.ts
4. AuthService.loginWithStudentCode():
   a. Queries public.child_access_codes via service-role client
   b. Verifies code_hash against pgcrypto crypt
   c. Checks expiry and revocation
   d. Returns platform JWT with role = 'student', sub = child_profile_id
5. Client calls useAuthStore.setAuth(user, token)
```

---

## 5. Frontend Implementation Details

### 5.1 Bilingual Root Layout (`src/app/layout.tsx`)

- Reads `jamea-lang` cookie **server-side** (default: `'ar'`)
- Sets `lang` and `dir` on `<html>` at render time — zero client-side flash
- Both `--font-arabic` (Cairo) and `--font-latin` (Geist) CSS variables are always present on `<html>` regardless of active language
- Active font family is switched in `globals.css` via `[dir="rtl"] body` / `[dir="ltr"] body` selectors — no JS required

### 5.2 Auth Store (`src/features/auth/store.ts`)

```typescript
// Persisted to localStorage under key 'jamea-auth'
// Only user and token are persisted — isLoading always resets to false on hydration
interface AuthState {
  user: AuthUser | null    // { id, email, role, studentCode? }
  token: string | null     // Platform JWT (NestJS-signed)
  isLoading: boolean       // Transient — not persisted
}
```

The store's `clearAuth()` is called automatically by the API client on any `401` response, which forces the UI back to the login page without requiring consumers to handle session expiry.

### 5.3 API Client (`src/lib/api/client.ts`)

```typescript
class ApiError extends Error {
  status: number   // HTTP status
  code: string     // 'UNAUTHORIZED' | 'FORBIDDEN' | 'API_ERROR' | custom
}
```

| Behaviour | Detail |
|-----------|--------|
| Bearer injection | `useAuthStore.getState().token` — synchronous, safe outside React render |
| `skipAuth: true` option | Used by login endpoints to opt out of token injection |
| `401` auto-logout | Calls `clearAuth()` before throwing — single place for session expiry |
| `204 No Content` | Returns `undefined` before `JSON.parse` to avoid runtime crash |
| Method helpers | `api.get()`, `api.post()`, `api.put()`, `api.patch()`, `api.delete()` |

### 5.4 Auth API (`src/features/auth/api.ts`)

| Function | Endpoint | Notes |
|----------|----------|-------|
| `loginAdult(supabaseToken)` | `POST /auth/login` | Sends Supabase token; receives platform JWT |
| `loginStudent(code)` | `POST /auth/student-login` | Normalises code `UPPER.trim()` before sending |

### 5.5 Adult Login Form (`src/features/auth/components/AdultLoginForm.tsx`)

State is managed as a `mode` discriminated union — not two separate booleans:

| `mode` | UI State |
|--------|----------|
| `idle` | Google button + "Continue with Email" button |
| `magic-link` | Email input + "Send magic link" form |
| `loading-oauth` | Spinner on Google button, all controls disabled |
| `loading-magic` | Spinner on submit button |
| `magic-sent` | Confirmation card + "Use a different email" escape |

An `exchangeInProgress` ref prevents double-exchange on `onAuthStateChange` firing twice during Next.js dev HMR.

### 5.6 OAuth Callback Route (`src/app/auth/callback/route.ts`)

Handles `GET /auth/callback?code=...` after Supabase redirects post-OAuth or magic-link click. Calls `supabase.auth.exchangeCodeForSession(code)`, sets the session cookie, then redirects to `/login` (or `?next=` param) where `onAuthStateChange` fires `SIGNED_IN`.

---

## 6. Data Flow & Security

### 6.1 Database Schema (Core Tables)

```sql
CREATE TYPE public.jamea_role AS ENUM ('parent', 'student', 'teacher', 'admin');

public.profiles (
  id              uuid PRIMARY KEY,
  email           text,                       -- NULL for students
  display_name    text NOT NULL,
  role            jamea_role NOT NULL,
  created_at      timestamptz,
  updated_at      timestamptz
  -- CHECK: role = 'student' OR email IS NOT NULL
)

public.parent_children (
  id                  uuid PRIMARY KEY,
  parent_profile_id   uuid REFERENCES profiles(id) ON DELETE CASCADE,
  child_profile_id    uuid REFERENCES profiles(id) ON DELETE CASCADE,
  relationship_label  text DEFAULT 'guardian',
  UNIQUE (parent_profile_id, child_profile_id)
)

public.child_access_codes (
  id                uuid PRIMARY KEY,
  child_profile_id  uuid REFERENCES profiles(id) ON DELETE CASCADE,
  code_hash         text UNIQUE NOT NULL,     -- pgcrypto crypt hash of 6-char code
  pin_hash          text,
  expires_at        timestamptz,
  revoked_at        timestamptz
)

public.course_approvals (
  id                  uuid PRIMARY KEY,
  parent_profile_id   uuid REFERENCES profiles(id),
  child_profile_id    uuid REFERENCES profiles(id),
  course_id           text NOT NULL,
  status              course_approval_status NOT NULL DEFAULT 'pending',
  UNIQUE (parent_profile_id, child_profile_id, course_id)
)

public.audit_events (
  id                uuid PRIMARY KEY,
  actor_profile_id  uuid REFERENCES profiles(id) ON DELETE SET NULL,
  event_type        text NOT NULL,
  payload           jsonb,
  created_at        timestamptz NOT NULL DEFAULT now()
)
```

### 6.2 Parent-Child Sub-Account Model

```
auth.users (Supabase managed)
    │
    ├── Parent user (email, OAuth/magic link)
    │       └── profiles row  (role = 'parent')
    │               └── parent_children row
    │                       └── Child profiles row  (role = 'student', email = NULL)
    │                               └── child_access_codes row  (hashed code, optional PIN)
    │
    └── Teacher user (email, OAuth/magic link)
            └── profiles row  (role = 'teacher')
```

**Key invariants:**
- A child profile is **never** a Supabase Auth user. No entry in `auth.users`.
- A child profile is owned by exactly one parent (FK + RLS).
- Deleting a parent cascades to all child profiles, access codes, and course approvals.
- `child_access_codes.code_hash` is computed by the `create_child_profile` RPC using `pgcrypto.crypt()`. Plaintext code is never persisted.

### 6.3 Role-Based Access Control (RBAC)

| Resource | `parent` | `student` | `teacher` | `admin` |
|----------|----------|-----------|-----------|---------|
| Own profile | RW | R | RW | RW |
| Child profiles (own) | RW | — | — | RW |
| Child profiles (others') | — | — | — | RW |
| `course_approvals` | RW (own) | R (own) | R | RW |
| `student_progress` | R (own children) | RW (own) | R (assigned) | RW |
| `audit_events` | R (own) | — | — | RW |
| `child_access_codes` | W (create/revoke) | — | — | W |

RBAC is enforced at **two layers**:
1. **NestJS route guards** — `JwtAuthGuard` + custom `RolesGuard` with `@Roles()` decorator
2. **Supabase RLS** — defence-in-depth; prevents data leaks even if the guard layer is misconfigured

### 6.4 Row-Level Security

```sql
-- profiles: self-access only
CREATE POLICY "profiles_self_access" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- parent_children: parent sees own rows only
CREATE POLICY "parent_children_owner" ON public.parent_children
  FOR ALL USING (
    auth.uid() = (SELECT id FROM public.profiles WHERE id = parent_profile_id)
  );

-- child_access_codes: zero direct client access
CREATE POLICY "codes_no_client_access" ON public.child_access_codes
  FOR ALL USING (false);
```

**Security-definer RPCs:**

| RPC | Caller | Effect |
|-----|--------|--------|
| `create_parent_profile(email, name)` | Server (post-OAuth) | Creates `profiles` row for parent |
| `create_child_profile(name, plain_code)` | Server (parent-authed) | Creates child profile + hashes code |
| `verify_child_access_code(plain_code)` | Server (unauthenticated) | Returns `child_profile_id` if code valid |
| `list_my_children()` | Client (parent JWT) | Returns child profiles owned by caller |

---

## 7. Environment Variables

### Backend (`backend/.env`)

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>   # Never expose to clients

JWT_SECRET=<random-256-bit-secret>
JWT_EXPIRY=900                                  # 15 min (seconds)

PORT=3001
FRONTEND_URL=http://localhost:3000              # Used by CORS (not CORS_ORIGIN)
```

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>       # Anon key only — safe for browser

NEXT_PUBLIC_API_URL=http://localhost:3001       # NestJS base URL
                                                # Note: routes include /api/ prefix
                                                # e.g. NEXT_PUBLIC_API_URL/api/auth/login

NEXT_PUBLIC_APP_URL=http://localhost:3000       # Used by metadata.metadataBase
```

---

## 8. Local Development

### Prerequisites

- Node.js 22+
- npm (project currently uses npm lockfiles)
- Supabase CLI (for local migrations)

### Start Commands

```bash
# Backend (NestJS)
cd backend
npm install
npm run start:dev          # :3001 — hot reload

# Frontend (Next.js)
cd frontend
npm install
npm run dev                # :3000

# API docs (backend must be running)
open http://localhost:3001/api/docs

# Supabase local (requires Docker)
supabase start
supabase db push
```

---

## 9. Backend TypeScript Config (`backend/tsconfig.json`)

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2023",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "ignoreDeprecations": "5.0",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": true,
    "strictBindCallApply": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

`"ignoreDeprecations": "5.0"` suppresses the TypeScript 5.0 deprecation warning for `baseUrl` when used without `paths`. `baseUrl: "./"` is retained because NestJS module resolution depends on it.

---

## 10. Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| NestJS issues its own JWT after Supabase auth | Decouples from Supabase Auth provider. Platform JWT carries `role` and `studentCode` claims Supabase JWTs do not support natively. |
| Students are not Supabase Auth users | Children have no email. Code-based login is appropriate for young learners; parents hold full lifecycle control. |
| Service-role key only on the backend | Prevents client-side privilege escalation. Frontend exclusively uses the anon key. |
| `child_access_codes` has zero RLS read access | Even authenticated parents cannot read code hashes. Verification is server-side only via `verify_child_access_code` RPC. |
| Feature-Sliced Design on the frontend | Three personas share one Next.js app. FSD prevents persona logic from bleeding across features and makes role-gating explicit at the feature boundary. |
| CSS logical properties for RTL | `margin-inline-start` maps to `margin-left` in LTR and `margin-right` in RTL automatically — no per-direction overrides needed. |
| Cookie-driven `dir` in root layout | Language preference (`jamea-lang` cookie) is read server-side, so `<html dir="">` is correct on first byte. No layout shift from client-side direction detection. |
| `mode` discriminated union in login form | Replaces two booleans (`isLoadingOAuth`, `isLoadingMagic`) with a single exhaustive state machine — eliminates impossible UI states. |
| `exchangeInProgress` ref in login form | Prevents double-calling the NestJS backend when `onAuthStateChange` fires twice during Next.js dev HMR. |

---

## 11. UX Walkthrough & Exact Code Mapping

> This section reads as a QA test script. Each visual description is followed by the exact source file responsible for that element.

---

### A. The Adult Login & Dashboard Journey

#### Step 1 — Arriving at `/login`

**Visual:** The browser renders a full-viewport split-screen. The left half (hidden on mobile) shows a deep gradient panel running from `fuchsia-600` to `violet-700`. On it: the Jamea monogram in a frosted-glass circle, a large Arabic headline **"تعلَّم العربية"** paired with "with Jamea" in muted white, and three pill badges labelled "Parents", "Students", "Teachers" at the bottom. The right half is white (`dark:bg-gray-950`) and horizontally+vertically centres the login card.

**→ Layout shell:** `src/app/(auth)/login/page.tsx`  
**→ Form logic:** `src/features/auth/components/AdultLoginForm.tsx`

---

#### Step 2 — The Login Form (idle mode)

**Visual:** The form shows a title "Welcome back" and subtitle "Sign in to your Jamea account". Below it: a white bordered button with a `LogIn` icon reading "Continue with Google". A thin divider with "or". A second bordered button "Continue with Email".

**→ File:** `src/features/auth/components/AdultLoginForm.tsx` — `mode === 'idle'` branch of the state machine.  
**→ State:** `const [mode, setMode] = useState<Mode>('idle')` — transitions on click.

---

#### Step 3 — Magic Link flow (mode: `magic-link`)

**Visual:** Clicking "Continue with Email" transitions the form: the two buttons are replaced by an email input field with a `Mail` icon pinned to the inline-start edge (RTL-safe: `ps-10`), a blue "Send magic link" submit button, and a "Cancel" ghost button. The submit button is disabled while `email.trim()` is empty.

**→ File:** `src/features/auth/components/AdultLoginForm.tsx` — `mode === 'magic-link'` branch.  
**→ Handler:** `handleMagicLink(e)` calls `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: /auth/callback } })`.

---

#### Step 4 — Magic link sent (mode: `magic-sent`)

**Visual:** The email input is replaced by a soft blue confirmation card: "Check your inbox" as a bold heading, "We sent a sign-in link to **you@example.com**" beneath it, and a small underlined "Use a different email" escape link.

**→ File:** `src/features/auth/components/AdultLoginForm.tsx` — `mode === 'magic-sent'` branch.

---

#### Step 5 — OAuth Callback (`/auth/callback`)

**Visual:** No UI — the browser briefly shows a blank page while the route handler runs server-side.

**→ File:** `src/app/auth/callback/route.ts`  
**→ What happens:** `supabase.auth.exchangeCodeForSession(code)` is called. On success, a session cookie is set and the browser is redirected to `/login`. The `onAuthStateChange` listener in `AdultLoginForm` fires `SIGNED_IN`, extracts `session.access_token`, calls `loginAdult(token)` in `src/features/auth/api.ts` → `POST /api/auth/login`, receives a platform JWT, calls `useAuthStore.setAuth(user, token)`, then `router.replace('/dashboard')` for parents or `/teacher` for teachers.

---

#### Step 6 — The Dashboard (`/dashboard`)

**Visual:** The page renders inside the persistent `<AppNav>` shell (see §B below). The body shows the Jamea logo image (`/logo-optimized.png`) centred at the top. If a student session exists, a green pill badge reads **"أهلاً، [studentName]"** with a user-circle icon. Below: a large Tajawal-font heading **"اختر رحلتك"** ("Choose your journey") in `var(--green)`, a subtitle, then a grid of journey cards.

**→ Route file:** `src/app/dashboard/page.tsx`  
**→ Auth guard:** `useEffect` checks `isAuthLoading`, then `user || savedCode || savedName` from `AppContext` + `localStorage`. If no session, `router.replace('/')`.  
**→ Global state:** `useAppContext()` from `src/context/AppContext.tsx` supplies `user`, `isAuthLoading`, `studentName`, `signOut`.

---

### B. The Student Learning Journey (The Gamified Map)

#### Step 7 — The Arabic Journey Map (`/journey/arabic`)

**Visual:** The page opens under `<AppNav>`. At the top: the Jamea logo + "JAMEA Platform" wordmark, an "Overall Progress" progress bar (currently 0%), and a bilingual toggle button **"عربي / English"** with a language icon. Below: a section labelled **"🚀 المرحلة الأولى: تعلم القراءة"** ("Phase 1: Learn to Read") followed by a horizontal scrollable row of five circular nodes.

**Node types in the row:**
- Node 1 — **"الحروف"** (The Letters): clicking this sets `activeNode = 'alphabet'` which reveals the full 28-letter Arabic alphabet grid below.
- Nodes 2–5 — Diacritic stages: **السكون** (Sukoon), **المدّ** (Madd), **الشدّة** (Shadda), **التنوين** (Tanween). Clicking navigates to `/journey/arabic/[stage]` where `stage` is one of `sukoon | madd | shadda | tanween`.

**→ Route file:** `src/app/journey/arabic/page.tsx`  
**→ State:** `const [activeNode, setActiveNode] = useState<MapNode>('alphabet')`  
**→ Letter click:** `router.push('/journey/arabic/letter/${letter}')` where letter is a single Arabic character (e.g. `ب`).  
**→ Stage data:** `src/data/stageData.ts` — `STAGE_DATA` map keyed by stage ID.

---

#### Step 8 — The Letter Grid (within the Map)

**Visual:** When `activeNode === 'alphabet'`, a 7-column grid of letter cards appears. Each card shows an Arabic letter in large Noto Naskh Arabic script. Beside some letters, an orange **"R"** revision button is visible. The 28 letters of the Arabic alphabet are listed left-to-right within an RTL layout.

**→ Letter data:** `src/data/db.ts` — `ARABIC_LETTERS` array (28 letters).  
**→ Letter names:** `LETTER_NAMES_EN` map in `db.ts` for English labels.  
**→ "R" button (Revision):** Routes to `/journey/arabic/color-mixer` — entry point to the Color Mixer Game.  
**→ Letter click handler:** `handleLetterClick(letter)` in `src/app/journey/arabic/page.tsx`.

---

#### Step 9 — The Letter Detail View (`/journey/arabic/letter/[id]`)

**Visual:** The screen fills with a richly-styled letter deep-dive. A horizontal tab bar at the top shows **13 sections** across 3 stage "rings":

| Section ID | Arabic Title | Stage Ring | Component |
|------------|-------------|------------|-----------|
| `hero` | الاستكشاف | 1 | Inline in `LetterScreen` |
| `motors` | الحركات | 1 | `src/components/LetterSections/MotorsSection.tsx` |
| `shapes` | أشكال الحرف | 1 | Inline (4-position shape cards) |
| `detective` | المحقق | 1 | `src/components/LetterSections/LetterDetective.tsx` |
| `xo2` | المقاطع | 1 | `src/components/LetterSections/XOWordGame.tsx` |
| `xo3` | الكلمات | 1 | `src/components/LetterSections/XOWordGame.tsx` |
| `missing` | الكلمة الناقصة | 1 | `src/components/LetterSections/MissingWordGame.tsx` |
| `split` | التركيب | 1 | Inline |
| `spin` | Spin & Read | 2 | `src/components/LetterSections/SpinWheelGame.tsx` |
| `cups` | Tricky Cups | 2 | Inline |
| `memory` | الذاكرة | 3 | `src/components/LetterSections/MemoryGame.tsx` |
| `speed` | السرعة | 3 | `src/components/LetterSections/SpeedReadGame.tsx` |
| `story` | قصة الحرف | 1 | Inline |

**Hero section visual:** The letter (e.g. **ب**) is displayed large with a coloured "connection rule" badge. The badge colour + label is resolved from `getLetterRule(letterId)` in `src/data/db.ts`. Example: letter **ب** resolves to the **"Broken Plate Rule"** (`color: '#3498db'`, icon `fa-utensils`). A sound button triggers `speakAr(letterId)` from `src/lib/speech.ts` — Web Speech API Arabic TTS. A Quran verse panel shows the verse from `QURAN_VERSES[letter]` in `db.ts`.

**4-Position shape row:** Four cards labelled **"في البداية"** (initial), **"في الوسط"** (medial), **"في النهاية"** (final), **"منفصل"** (isolated), each showing the letter form at that position from `FULL_DB[letterId].shapes`.

**→ Route file:** `src/app/journey/arabic/letter/[id]/page.tsx`  
**→ Data:** `FULL_DB` and `getLetterRule()` from `src/data/db.ts`  
**→ Speech:** `speakAr()` from `src/lib/speech.ts`  
**→ Context:** `addStars()` from `src/context/AppContext.tsx` — awards stars on section completion  
**→ Fullscreen scaling:** `useEffect` on `isFullscreen` state applies CSS `transform: scale()` to `wrapperRef` for immersive mode.

---

#### Step 10 — The Stage Deep-Dive (`/journey/arabic/[stage]`)

**Visual:** Navigating to `/journey/arabic/sukoon` (for example) renders the **StageScreen** shell. It assembles a vertical stack of components: `StageHero` (banner with stage title + progress ring), `StageMotorsSection` (audio drills for the diacritic), `StageDetectiveSection` (spot the mark game), `StageMissingMarkGame` (fill in the missing diacritic), `StageQuestionTools` (inline Q&A cards).

**→ Route file:** `src/app/journey/arabic/[stage]/page.tsx`  
**→ Shell component:** `src/components/StageSections/StageScreen.tsx` — receives `stageData` prop  
**→ Data:** `STAGE_DATA[params.stage]` from `src/data/stageData.ts` (keyed `sukoon | madd | shadda | tanween`)  
**→ Not-found guard:** `if (!stageData) return notFound()` — Next.js 404 for invalid stage IDs.

---

### C. The Color Mixer Game — Deep Dive (`/journey/arabic/color-mixer`)

#### Step 11 — Entry Point

**Visual:** From the Arabic Journey Map, the student taps an orange **"R"** revision button adjacent to any letter card. The router pushes to `/journey/arabic/color-mixer`, rendering the Color Mixer Game within the `<AppNav>` shell.

**→ Entry trigger:** `router.push('/journey/arabic/color-mixer')` from `src/app/journey/arabic/page.tsx`  
**→ Route file:** `src/app/journey/arabic/color-mixer/page.tsx` — thin shell, imports and renders `<ColorMixerGame />`  
**→ Game component:** `src/features/journey/components/ColorMixerGame.tsx`

---

#### Step 12 — Initial Screen (Level 1, 3 colors)

**Visual:** The full viewport is a soft magical gradient: `from-fuchsia-50 via-rose-50 to-violet-100`. The layout is RTL (`dir="rtl"`). At the top: the title **"لعبة مزج الألوان 🎨"** in bold `text-fuchsia-700`, with the subtitle **"اضغطي على الكلمات لتمزج الألوان المطلوبة"** in muted violet.

Below the title: three `rounded-full` level selector pills — **المستوى الأول**, **المستوى الثاني**, **المستوى الثالث**. The active level pill is styled `bg-fuchsia-500 text-white scale-105 shadow-fuchsia-300` — visually elevated. Inactive pills are white with a fuchsia border.

**→ File:** `src/features/journey/components/ColorMixerGame.tsx`  
**→ State:** `const [state, setState] = useState<GameState>(() => buildInitialState(0))`  
**→ `buildInitialState(0)`:** Calls `pickTargetColors(level.available, level.required)` — randomly selects 3 color IDs from the 5 available in Level 1 (`rose`, `violet`, `fuchsia`, `teal`, `amber`).

---

#### Step 13 — The Two Colour Pots

**Visual:** Two large `rounded-full` circles (80×80px) are displayed side by side, connected by a ⚡ divider. The **left pot** (labelled **"الهدف"** — Target) shows a solid blended colour computed from the randomly selected 3 target colors using `mixHexColors()`. A row of small colour dot swatches beneath it reveals the target components. The **right pot** (labelled **"وعاء المزج"** — Mixing Pot) starts as pale pink `#fce7f3` with the text **"فارغ"** (Empty). As colors are added, its fill transitions live to the running mix of added hex values.

Both pots have `ring-4` halos — violet for Target, rose for Mixing Pot.

**→ File:** `src/features/journey/components/ColorMixerGame.tsx` — "Two Colour Pots" JSX block  
**→ Logic:** `mixHexColors(hexList)` — averages R, G, B channels independently across all hex values in the list. Called once for `targetColors` (fixed) and once for `addedIds` (updates on each click).  
**→ Transition:** `transition-colors duration-500` on both circle divs — colour changes animate smoothly.

---

#### Step 14 — The Arabic Word Buttons

**Visual:** Below the pots, words are split into two horizontal `flex-wrap` rows with a progress bar between them. Each word is a `rounded-2xl` white card. The word itself (e.g. **بَثَتَ**, **كَتَبَ**, **ذَهَبَ**) is rendered in large `text-xl font-extrabold` using `var(--font-arabic)`, coloured in its corresponding hex value with a glow `textShadow` of the same color at 33% opacity.

| Word | Color | Hex |
|------|-------|-----|
| بَثَتَ | rose | `#fb7185` |
| كَتَبَ | violet | `#a78bfa` |
| ذَهَبَ | fuchsia | `#e879f9` |
| سَمِعَ | teal | `#2dd4bf` |
| فَعَلَ | amber | `#fbbf24` |
| نَظَرَ | sky | `#38bdf8` |
| رَسَمَ | lime | `#a3e635` |
| لَعِبَ | pink | `#f472b6` |
| قَرَأَ | indigo | `#818cf8` |

**→ Data:** `COLOR_WORDS` array in `src/features/journey/components/ColorMixerGame.tsx`  
**→ Component:** `<WordButton>` — receives `word`, `isAdded`, `isTarget`, `onClick` props. Uses `style={{ color: word.hex, textShadow: ... }}` for the colour. On hover: `hover:scale-110 hover:shadow-xl`. Disabled (already added): `opacity-40 cursor-not-allowed scale-95` with a `✓` badge.

---

#### Step 15 — Clicking a Word (Interaction)

**Visual:** The student taps **بَثَتَ** (styled in rose `#fb7185`). The mixing pot immediately `animate-bounce`s for 600ms via the `potPulse` state field. The pot's fill color transitions from pale pink to the rose hex. A rose dot swatch appears beneath the mixing pot. The word button fades to `opacity-40` and shows a `✓` overlay — it cannot be clicked again.

**→ Handler:** `handleWordClick(word)` in `src/features/journey/components/ColorMixerGame.tsx`  
**→ Sequence:**
```
addedIds = [...prev.addedIds, word.id]
→ check: addedIds exactly equals targetIds → status = 'win'
→ check: overAdded or length >= required but mismatch → status = 'lose'
→ potPulse = true → setTimeout 600ms → potPulse = false
```
**→ Animation:** `state.potPulse ? 'animate-bounce' : ''` applied to the mixing pot circle class.

---

#### Step 16 — Progress Bar

**Visual:** Between the two word rows, a thin `h-2 rounded-full` progress track fills left-to-right from `fuchsia-400` to `violet-500` as the student adds colours. The label above reads **"1 / 3 ألوان"** (in Level 1) updating to **"2 / 3"**, **"3 / 3"** on each click.

**→ File:** `src/features/journey/components/ColorMixerGame.tsx`  
**→ Calculated:** `width: ${Math.min((state.addedIds.length / level.required) * 100, 100)}%`

---

#### Step 17 — Win State

**Visual:** When the student adds exactly the 3 required target colors and no wrong ones, the word grid is replaced by a `rounded-2xl` card with a teal-to-fuchsia gradient, a large **🌟** emoji, the heading **"أحسنتِ! ممتاز!"** in `text-teal-600`, and the line **"مزجتِ الألوان الصحيحة تماماً"**. Two buttons appear: **"مرة أخرى 🔄"** (reset current level) and **"المستوى التالي ✨"** (advance to Level 2).

**→ File:** `src/features/journey/components/ColorMixerGame.tsx` — `state.status === 'win'` block  
**→ Advance handler:** `handleNextLevel()` calls `buildInitialState(Math.min(levelIndex + 1, 2))` — capped at Level 3.

---

#### Step 18 — Lose State

**Visual:** Adding a wrong color (one not in `targetIds`) immediately triggers the lose card: `from-rose-100 to-pink-100` gradient background, **💔** emoji, heading **"حاولي مرة أخرى!"** in `text-rose-500`, and **"الألوان لم تتطابق، لا تستسلمي!"** ("The colours didn't match, don't give up!"). Only the **"مرة أخرى 🔄"** reset button is shown.

**→ File:** `src/features/journey/components/ColorMixerGame.tsx` — `state.status === 'lose'` block  
**→ Trigger condition:** `overAdded || (nextAdded.length >= targetIds.length && !correct)`

---

#### Step 19 — Level Progression (Stages 1 → 2 → 3)

| Level | Label | Colors Required | Available Pool Size | New Words Unlocked |
|-------|-------|-----------------|--------------------|--------------------|
| 1 | المستوى الأول | 3 | 5 | بَثَتَ كَتَبَ ذَهَبَ سَمِعَ فَعَلَ |
| 2 | المستوى الثاني | 5 | 7 | + نَظَرَ رَسَمَ |
| 3 | المستوى الثالث | 7 | 9 | + لَعِبَ قَرَأَ |

**Visual progression:** Moving from Level 1 to Level 3, the word grid visibly expands — from 5 coloured buttons (3 per row) to 9 buttons (5 + 4 rows). The target pot now shows 7 colour swatches. The progress bar denominator changes from `/3` to `/5` to `/7`.

**→ Data:** `LEVELS` array in `src/features/journey/components/ColorMixerGame.tsx`  
**→ `available` field** on each level entry controls which `COLOR_WORDS` entries are filtered and rendered.  
**→ Random target selection:** Every new game (including reset) calls `pickTargetColors(level.available, level.required)` — shuffles `available` array with `sort(() => Math.random() - 0.5)` and slices the first `required` entries. No two games have the same target combination.
