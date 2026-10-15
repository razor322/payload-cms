# Delivery Gate — Web Admin v1

Antislop release gate. Every PASS carries evidence. Any FAIL blocks shipping.

_Status: code complete; live click-through pending the service-role key + admin user._

## Block 1 — Hard Gate

| Rule | Result | Evidence |
|---|---|---|
| R-02 no em dash in UI copy | PASS | UI strings use plain words; no `—` in components. |
| R-03 mobile layout | PASS | No fixed widths; grids collapse to 1 col; tables scroll in-container. |
| R-17 no invented numbers | PASS | Only real counts from the DB. |
| R-18 no fake testimonials | PASS | Testimonials table ships empty; no fabricated entries. |
| R-23 assets not assumed | PASS | No logos/avatars generated; `ImageUpload` takes the owner's file. |
| R-24 navigation | PASS | Every nav item maps to a real route in `PROJECT_STRUCTURE.md` §6. |
| R-25 contrast | PASS | Paper `#fdf6e3` / ink `#0b0b0b` ≈ 18:1; accent used on ink text only. |
| R-26 interactive elements | PASS | Every button is submit/link/action; no dead controls. |
| R-27 UI states | PASS | `Empty`, `Loading`, `ErrorState` components; lists render `Empty`. |
| R-28 FAQ | N/A | No FAQ. |
| R-32 keyboard | PASS | Focus-visible outlines on all controls; Confirm closes on Escape. |
| R-33 no patch scripts | PASS | All styling in source. |
| R-34 every theme | N/A | Light-only, deliberate (admin tool). |
| R-35 verify before deliver | PENDING | Live click-through requires service-role key + admin user. |
| R-36 no fabricated claims | PASS | No security/perf claims in UI. |
| R-37 design direction | PASS | Owner specified neobrutalism; tokens in `docs/CONFIGURATION.md` §5.4. |
| R-38 real content or placeholder | PASS | Seeded from the three real sites. |

## Block 2 — Purpose-Gate (technique + written reason)

| Rule | Result | Reason (written) |
|---|---|---|
| R-01 color | PASS | Paper + ink + one accent; reason in CONFIGURATION §5.4. |
| R-04 icons | PASS | Arrows only for reorder (function), not decoration. |
| R-06 typography | PASS | Geist (shadcn default), system-consistent; no fake terminal. |
| R-07 background | PASS | Flat paper; no grid/dot pattern. |
| R-12 shadow | PASS | One hard offset shadow marks every editable card (identity). |
| R-31 every decision | PASS | Recorded in CONFIGURATION §5.4. |

## Block 3 — Liveliness

- Reading: internal admin for one developer, neobrutalist language.
- Dial **ENERGY 3 / RHYTHM 2 / MOTION 1**.
- ENERGY 3: thick borders, hard shadows, high-contrast blocks.
- RHYTHM 2: consistent list/form layout, the dashboard varies.
- MOTION 1: motion only as state feedback (active-press, pending labels).

## Block 4 — Craftsmanship & Quality Locks

| Item | Result |
|---|---|
| C-1 intentionality | PASS |
| C-2 functional completeness | PENDING live check |
| C-3 content-driven | PASS — sections match the real content model only |
| C-4 resilience | PASS — empty/loading/error present |
| C-5 evidence | PASS |
| R-05 layout | PASS — no template hero/features/pricing |
| R-11 radius | PASS — `--radius: 0` |
| R-15 CTA | PASS — "New project", "Save", "Sign in" |
| R-16 copy | PASS — no buzzwords |
| R-20 identity | PASS — neobrutalism |
| R-21 theme | PASS — light-only, reasoned |
| R-29 palette | PASS — 2 core + 1 accent |
| R-30 no clones | PASS |

## Live click-through (to be filled)

| Element | Expected | Result |
|---|---|---|
| `/` unauthenticated | redirect → `/login` | |
| login wrong email | error "not allowed" | |
| login right | → dashboard | |
| dashboard counts | match DB | |
| projects list | 7 rows | |
| create project | appears in list + DB | |
| edit project | persists | |
| reorder project | persists | |
| upload image | public URL + preview | |
| delete project | removed | |
| experiences/skills/capabilities/testimonials/awards | CRUD works | |
| headers upsert | no duplicate | |
| profile save | persists | |
| sign out | → `/login` | |
