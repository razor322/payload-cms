# Design direction: Portfolio Admin

Direction agreed with the owner. The agent recorded it. The owner owns it.

## Identity

A control board. The admin is a tool for one owner, so it reads as an
instrument panel rather than a consumer product.

## Personality

Blunt, dense, unornamented. The content is the interface, so decoration that
carries no meaning stays out.

## Palette

| Token | Value | Use |
|---|---|---|
| Canvas | oklch(0.972 0.026 92) | Page and panel background |
| Ink | oklch(0.145 0 0) | Text, borders, shadows |
| Accent | oklch(0.65 0.21 42) | Primary action, focus ring, active nav only |

Three colours plus black and white. The accent appears on one action per screen,
so it keeps its meaning.

## Typography

| Role | Font | Reason |
|---|---|---|
| Display | Archivo | An industrial grotesk with a heavy weight, suits the panel voice |
| Body | Inter | Neutral, readable at the small sizes an admin uses |
| Mono | JetBrains Mono | Keeps ids, slugs and counts aligned |

## Shape

Radius is 0px everywhere. That squared corner is the identity, and it removes
the softness that would fight the hard border. Borders are 2px ink. Shadow is
4px 4px 0 ink, and only on elements that genuinely sit above the page.

## Mood

Instrumental, direct, legible.

## Dials

ENERGY 2 / RHYTHM 1 / MOTION 1. A tool, not a showcase: structure stays uniform,
and motion is limited to hover and focus feedback.

## Not doing

Dark mode. The panel is light by default, set in payload.config.ts.
