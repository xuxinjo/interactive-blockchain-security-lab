# Architecture

This is a concept-stage Next.js App Router prototype. Most page text comes from typed files in `content/`, so the thesis facts are easier to check.

## Folders

- `app/` - routes and layout
- `components/` - reusable page pieces
- `content/` - framework cells, diagrams, case studies, chart data, thesis metadata
- `lib/` - shared types, thesis map, lab state machine
- `tests/` - Vitest unit tests and Playwright smoke tests

## Routes

- `/` - overview, research questions, Finding 1
- `/framework` - protocol/network/application x CIA grid
- `/diagrams` - six step diagrams
- `/cases` - six case studies and comparison table
- `/lab` - re-entrancy and bridge state views
- `/insights` - ML/static/formal/operational comparison
- `/data` - Table 6 charts
- `/about` - thesis details, links, and mapping table
- `/feedback` - local notes

## Data

- `CaseStudy` holds the five-part case template and documented loss notes.
- `FrameworkCell` holds threats, trust assumptions, defences, and thesis references.
- `DiagramMetadata` holds diagram labels and steps.
- `ChartIncidentValue` holds Table 6 values. Parity is left out of value charts because the thesis records frozen funds, not stolen value.

## Charts and motion

The charts are SVG components, not a charting library. Animations use framer-motion and respect `prefers-reduced-motion`.

## Accessibility

The app keeps semantic landmarks, a skip link, visible focus rings, keyboard controls, labelled diagrams, and smoke tests for the main routes.
