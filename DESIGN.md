# Design direction: Portfolio Admin

Direction agreed with the owner. The agent recorded it. The owner owns it.

Style: Neubrutalism. Bold, colourful, raw, playful.

## Identity

A control board. The admin is a tool for one owner, so the structure reads as an
instrument panel: dense, legible, built to be scanned. The skin on top is loud,
which is the point of the style.

## Personality

Blunt, dense, high contrast. Raw but functional. Every edge is deliberate, so
nothing looks like an accident of default styling.

## Palette

| Token | Value | Use |
|---|---|---|
| Canvas | `#FDF6E3` warm paper | Page and panel background |
| Ink | `#000000` black | Text, borders, shadows |
| Primary | `#FFEB3B` yellow | The single action that moves the task forward |
| Secondary | `#FF5252` red | Destructive action only |
| Tertiary | `#2196F3` blue | Informational marks, links, active nav |

Five colours. This is a deliberate override of antislop R-29 (2 to 3 core plus
one accent), approved by the owner for this style. The saturation is kept from
becoming noise by three rules:

- Black border and black text carry all structure. Colour never carries meaning
  on its own, so the panel survives a greyscale screenshot.
- Yellow appears once per screen, on the primary action. If everything is yellow,
  nothing is.
- Red is reserved for destructive actions only. It never decorates.
- Blue marks navigation state and links.
- No gradients anywhere (antislop R-01). Flat fills only.

## Typography

| Role | Font | Reason |
|---|---|---|
| Display | Archivo, weight 800 | Industrial grotesk. Heavy weight suits the panel voice. |
| Body | Inter, weight 400 to 700 | Neutral and readable at the small sizes an admin uses. |
| Mono | JetBrains Mono | Ids, slugs and counts stay aligned. |

Labels and headings are uppercase with modest tracking. Body text stays sentence
case, because all caps at length is unreadable.

## Shape

Radius is `0px` everywhere. The squared corner is the identity and it removes the
softness that would fight the hard border.

| Token | Value |
|---|---|
| Border | `3px solid #000000` |
| Shadow | `5px 5px 0 #000000` |
| Shadow (small) | `3px 3px 0 #000000` |
| Radius | `0px` |

Borders are always pure black, never a tinted grey. Shadows are hard offsets with
no blur, so an element reads as a physical plate laid on the page.

Shadow is not on every element. It marks what genuinely sits above the page: a
card on hover, a popup, a modal, a toast, and the primary button (antislop R-12).
A page where everything floats has no hierarchy left.

## Motion

Motion is fast and mechanical. A press translates the element by the shadow
offset and removes the shadow, so it reads as being pushed into the page. Nothing
eases softly, nothing floats. Hover and focus get a 120ms transition.

## Dials

ENERGY 3 / RHYTHM 2 / MOTION 1. The skin is loud, the structure stays even, and
motion is limited to press and hover feedback. A tool has no time to perform.

## Not doing

Dark mode. The panel is light by default, set in `payload.config.ts`.

## Access

Contrast is checked against the canvas, not assumed. Black on paper and black on
yellow both clear WCAG AA. When a colour is used as a background, the text on it
is black, never white on yellow or white on red.
