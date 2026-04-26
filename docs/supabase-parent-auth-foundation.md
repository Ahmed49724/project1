# Supabase Parent Auth Foundation

This file explains how to apply the database foundation for Jamea parent-owned accounts and child access codes.

## What Was Added

Migration:

`supabase/migrations/20260426000000_parent_secure_auth_foundation.sql`

It creates:

- `profiles`
- `parent_children`
- `child_access_codes`
- `course_approvals`
- `audit_events`
- compatibility columns on `student_progress`

It also creates RPC functions:

- `create_parent_profile(parent_email, parent_display_name)`
- `create_child_profile(child_display_name, plain_code)`
- `list_my_children()`
- `verify_child_access_code(plain_code)`

## How To Apply

Option A: Supabase dashboard

1. Open your Supabase project.
2. Go to SQL Editor.
3. Paste the contents of `supabase/migrations/20260426000000_parent_secure_auth_foundation.sql`.
4. Run it.

Option B: Supabase CLI

```bash
supabase db push
```

Use this only after linking the local project to the correct Supabase project.

## Runtime Behavior

Before the migration is applied:

- The site still works.
- Parent and child profiles are stored locally in the browser.
- Student progress still uses the existing fallback behavior.

After the migration is applied and Supabase email auth is available:

- Parent email sign-in can send a magic link.
- Parent profile syncs through `create_parent_profile`.
- Child profile creation syncs through `create_child_profile`.
- Student code login can verify through `verify_child_access_code`.
- Child code hashes are not exposed through direct table reads.
- Student progress can attach to `child_profile_id` and `parent_profile_id` when a parent-owned child session is active.

## Security Notes

- `child_access_codes` is intentionally not readable by clients.
- Student code verification happens through a security definer RPC.
- Parent-owned rows are protected by row-level security.
- This is the database foundation; full production hardening still needs server-side auditing, rate limiting, and provider configuration.

## Current App Integration

The current static app uses:

- `src/scripts/auth-session.js` for normalized parent/student sessions.
- `src/scripts/main.js` for the existing platform flow.
- `src/scripts/verb-lab.js` for receiving the unified child session inside Verb Lab.

The app is intentionally tolerant:

- If Supabase RPCs fail, the local flow remains usable.
- If Supabase Auth has no active parent session, child creation stays local.
- If a valid remote child code is entered, it creates a student session using the returned child profile ID.
- The Parent Portal shows whether it is running in local mode or secure cloud sync mode.

## Recommended Test Flow

1. Run the SQL migration.
2. Enable email magic links in Supabase Auth.
3. Open the app and choose Parent mode.
4. Enter a parent email and continue.
5. Open the magic link from the same browser.
6. Confirm Parent Portal shows secure cloud sync active.
7. Create a child profile and save the one-time child code.
8. Log out, choose Student mode, and enter the child code.
9. Open the Arabic journey and Verb Lab; both should use the same child session.
