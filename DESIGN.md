# Design direction: Portfolio Admin

Direction agreed with the owner. The agent recorded it. The owner owns it.

## Identity

A control board with a soft edge. Dense like an instrument panel, but the
corners curve and the accents are pastel, so it reads as approachable rather
than severe.

## Personality

Direct, compact, quietly playful. Three pastel accents carry the states, so the
panel never has to shout.

## Palette

| Token | Value | Use |
|---|---|---|
| Canvas | #f4f4f5 | Page background |
| Card | #FFFDF7 | Card and panel surfaces |
| Ink | #09090b | Text, borders, shadows |
| Muted | #6b6b74 | Subtitles, inactive nav, helper text |
| Structural border | #ececee | Dividers and panel edges |
| Yellow | #FFEAA7 | Secondary action, active nav, secondary badge |
| Red | #FF6B6B | Destructive action and badge |
| Blue | #74b9ff | Informational badge |
| Pink | #FF90E8 | Logout, avatar fill |

Ink is #09090b, never pure black, so the panel keeps a trace of warmth.

## Typography

| Role | Font | Reason |
|---|---|---|
| Heading | Montserrat | Geometric and heavy, carries the uppercase page titles |
| Body | DM Sans | Neutral and compact, reads well at 13 to 15px |
| Mono | JetBrains Mono | Ids, slugs and counts stay aligned. |

Card titles and nav items are uppercase at 10 to 12px with wide tracking. Body
text stays sentence case.

## Shape

| Token | Value |
|---|---|
| Border, strong | 2px solid #09090b |
| Border, structural | 2px solid #ececee |
| Radius, controls | 12px |
| Radius, cards | 16px |
| Shadow, base | 4px 4px 0 #000000 |
| Shadow, small | 2px 2px 0 #000000 |
| Shadow, hover | 6px 6px 0 #000000 |
| Focus ring | 3px solid #09090b |

Two laws, held everywhere:

- Press: translate by the shadow offset and drop the shadow. The element sinks.
- Hover: lift 2px and grow the shadow one step. The element is picked up.

The focus ring is ink, not the yellow accent. Yellow on cream and on white
measures about 1.2:1, so a ring in that colour is not a ring. Ink is the one
mark that reads on every surface in the panel.

## Motion

120ms, mechanical. No easing that floats or bounces.

## Dials

ENERGY 2 / RHYTHM 2 / MOTION 1. The accents are pastel and the corners curve, so
the energy sits below the earlier sharp-cornered pass. Structure varies between
the nav, the list and the form, so rhythm is 2. Motion stays feedback only.

## Not doing

Dark mode. The panel is light by default, set in payload.config.ts.
