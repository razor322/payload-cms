# Design direction: the kyos admin

The reference is the admin of the kyos photobooth app
(`the kyos photobooth checkout`): the `AdminLayout` frame, the
`StatCard` and `SectionCard` surfaces, the `Button`, `Input` and `Badge`
vocabulary, and the tailwind tokens behind them.

The frame is quiet. The content is loud. That split is the whole idea.

## Palette

The kyos tokens, unchanged.

| Token | Value | Role |
|---|---|---|
| Canvas | `#f4f4f5` | The page behind everything |
| Card | `#fffdf7` | The cream ground of every content card |
| Snow | `#ffffff` | The sidebar, the top bar, the inputs |
| Subtle | `#fafafa` | The recessed surfaces inside a card |
| Ink | `#09090b` | The deepest ink. Never pure black. |
| Graphite | `#18181b` | Body text |
| Iron | `#3f3f46` | Secondary text |
| Fog | `#71717a` | Muted text, the idle nav label |
| Ash | `#a1a1aa` | Placeholders |
| Mist | `#d4d4d8` | The dashed rule |
| Cloud | `#ececee` | The hairline rule, the soft border |
| Yellow | `#ffeaa7` | The current place: the active nav item |
| Pink | `#ff90e8` | The way out: the logout |
| Pink deep | `#e74c89` | The avatar |
| Red | `#ff6b6b` | Undo |
| Blue | `#74b9ff` | Information |
| Purple | `#4a2e83` | A card accent |
| Ink deep | `#2d1b54` | A card accent |
| Ember | `#ff5a00` | A card accent |

The accents never talk over each other. The yellow means "you are here", the
pink means "leave", the red means "undo", and the four card accents only ever
appear as a 6px bar beside a card title.

## Typography

One family, DM Sans, the way the kyos app runs it. The mono, JetBrains Mono,
is kept back for the ids and the slugs, which the content admin needs and the
kyos app does not.

| Role | Size | Weight | Case |
|---|---|---|---|
| Page title | 20px | 800 | Uppercase, tracking -0.03em |
| Card title | 14px | 800 | Uppercase, tracking -0.02em |
| Nav item | 14px | 500 | Sentence case |
| Small label | 10px | 700 | Uppercase, tracking 0.1em |
| Body and field | 14px | 400 | Sentence case |
| Muted label | 10px | 700 | Uppercase, tracking 0.1em, in fog |

## Shape

| Token | Value |
|---|---|
| Border, strong | 2px solid `#09090b` |
| Border, hairline | 2px solid `#ececee` |
| Radius, control | 12px |
| Radius, card | 16px |
| Radius, badge | 8px |
| Radius, pill | 999px |
| Shadow, small | 2px 2px 0 `#000000` |
| Shadow, base | 4px 4px 0 `#000000` |
| Shadow, hover | 6px 6px 0 `#000000` |

Two laws, held everywhere:

- Hover: lift 2px and grow the shadow one step. The element is picked up.
- Press: sink by the shadow offset and drop the shadow. The element goes down.

The focus ring is ink, not the kyos yellow. A yellow ring on cream and on
white measures about 1.2:1, so it is not a ring. Ink is the one mark that
reads on every surface in the panel.

## The frame

The kyos `AdminLayout`, with the panel of a content admin in place of the
page.

- The sidebar is a white column, 256px, with a 2px cloud rule on the right and
  no shadow. The wordmark block sits on top: the name at 24px in ink, the role
  underneath at 10px in fog.
- The list items are flat. An idle item is fog text with no border. The
  current item is yellow with an ink border and the base shadow, lifted 2px.
  Hovering an idle item gives it a cloud ground, an ink border and the small
  shadow.
- The top bar is white, 64px, with a 2px cloud rule under it, and it stays put
  while the content scrolls under it. The page title is on the left, the locale
  switcher and the account chip on the right.
- The account chip is a cream card with a cloud rule. The avatar is a pink
  square with an ink border and the small shadow.
- The logout is the pink card, with the base shadow, and it grows to the hover
  shadow when it is pointed at.

The content column starts where the sidebar ends, the way the kyos admin
offsets its content by the width of its sidebar. Below 1024px the sidebar
becomes a 72px rail that opens over the content.

## The cards

The kyos `Card` and `SectionCard`.

- A content card is cream, with a 2px ink border, a 16px radius and the base
  shadow. It lifts to the hover shadow on hover and sinks on press.
- A card title is 14px in ink, uppercase. The dashboard collection cards carry
  the kyos stat card accent bar: a 6px pill in ember, purple, pink deep or
  ink deep, one per card.
- The dashboard panel takes a 2px ink rule under its title, the way the kyos
  chart card does.

## The controls

The kyos `Button`, `Input` and `Badge`.

- The primary button is ink on snow, 12px radius, the base shadow, and it
  grows to the hover shadow and lifts. The secondary is yellow with the small
  shadow. The destructive is red. The quiet button has no border until it is
  hovered.
- An input is white with a 2px ink border and a 12px radius, 14px in medium
  weight. No shadow: the hairline border is the elevation.
- A badge is an 8px radius with a 2px ink border, 10px in bold uppercase, and
  the small shadow.

## The list

The kyos table. An ink rule under the head, the head on a cloud ground, a
cloud rule between the rows, an even row on a soft cloud, and a warm yellow
hover.

## Motion

120ms, mechanical. No easing that floats or bounces.

## Not doing

Dark mode. The panel is light by default, set in payload.config.ts.

## What differs from the kyos app, and why

- The sidebar collapses. The kyos app has nine items and a fixed column; this
  admin has eighteen collections, so the column gives way to a rail on the
  narrow screens and the owner can fold it on the wide ones.
- The focus ring is ink. The kyos app uses a yellow ring, which does not read
  on a cream ground.
- The card accents are the four kyos stat accents, used as a bar beside a
  card title. The kyos app puts them on the analytics cards.
- The ids and the slugs are mono. The kyos app has no ids.
