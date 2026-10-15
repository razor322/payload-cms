# Phase 9 — Polish + Delivery Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Accessibility, mobile, and a passing antislop Delivery Gate before declaring v1 done.

**Architecture:** No new features. Audit the built app, fix defects, record evidence. The Delivery Gate report is the completion artifact.

**Tech Stack:** Next.js, browser dev tools, keyboard.

## Global Constraints

- Every delivery claim needs recorded evidence (antislop R-35).
- No dead controls; every interactive element does something real.
- WCAG AA contrast; visible focus; keyboard operable.

---

### Task 1: Accessibility audit

**Files:**
- Modify: any component failing the audit

- [ ] **Step 1: Contrast**

Check every text/background pair against `--background` and `--accent`. Fix any
ratio under 4.5:1 (3:1 for 18px+). Record the values.

- [ ] **Step 2: Keyboard**

Tab through every screen. Confirm logical order, visible focus, Enter/Space on
buttons, Escape closes the confirm dialog. Fix gaps.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: accessibility pass"
```

---

### Task 2: Mobile + overflow

**Files:**
- Modify: any layout overflowing

- [ ] **Step 1: Breakpoints**

Test at 390px, 768px, 1440px. Confirm no horizontal scroll, the header nav wraps,
tables scroll within their container, tap targets ≥ 44px. Fix as needed.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "fix: mobile layout pass"
```

---

### Task 3: Delivery Gate

**Files:**
- Create: `docs/DELIVERY-GATE.md`

**Interfaces:**
- Consumes: the running app.
- Produces: a PASS/FAIL report.

- [ ] **Step 1: Run the build and stop dev-server test**

Run: `bun run build`, then `bun dev`. Confirm no console errors on load.

- [ ] **Step 2: Click-through, element by element**

Record each: login (wrong email → error; right → dashboard), each list
(empty/loaded), each form (validation on empty, success on valid), create/edit/
delete/reorder, image upload, sign out. One line per element with its result.

- [ ] **Step 3: Write the report**

`docs/DELIVERY-GATE.md`: one line per antislop item (Hard Gate, Purpose-Gate with
written reasons, Liveliness dials, Craftsmanship locks), each PASS with evidence,
or FAIL with the fix. No FAIL ships.

- [ ] **Step 4: Commit**

```bash
git add docs/DELIVERY-GATE.md
git commit -m "docs: delivery gate report"
```

---

### Task 4: Finalize README + roadmap

**Files:**
- Modify: `README.md`, `docs/README.md`, `docs/ROADMAP.md`

- [ ] **Step 1: Update**

README: final quick start + status. Roadmap: tick Phase 9 and the whole v1.

- [ ] **Step 2: Commit**

```bash
git add README.md docs/README.md docs/ROADMAP.md
git commit -m "docs: finalize readme and roadmap"
```

---

### Task 5: Release

- [ ] **Step 1: Confirm all checks**

Run: `bun run build`, `bun test`, `bun run lint`
Expected: all clean.

- [ ] **Step 2: Tag**

```bash
git tag v1.0.0
git commit --allow-empty -m "chore: release v1.0.0" || true
```
