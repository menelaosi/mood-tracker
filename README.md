# Mood Tracker — Menelaos "Mikey" Ioannou - React Native for Web

A React Native + TypeScript monorepo mood-tracking app that runs on **iOS**, **Android**, and **Web** via React Native Web. Boilerplate styling and README.md generated using Claude Agents.

## Architecture

```
mood-tracker/
├── apps/
│   └── mobile/          # Expo app — iOS · Android · Web
├── packages/
│   ├── store/           # Redux Toolkit store (shared state)
│   └── ui/              # Design tokens & theme (shared)
├── turbo.json           # Turborepo task orchestration
└── package.json         # Yarn workspaces root
```

## Tech Stack

| Layer      | Choice                  | Why                               |
| ---------- | ----------------------- | --------------------------------- |
| Framework  | React Native + Expo 52  | Cross-platform iOS/Android/Web    |
| Web        | React Native Web        | Same components, zero duplication |
| State      | Redux Toolkit           | Predictable, type-safe, DevTools  |
| Language   | TypeScript (strict)     | Full type safety across packages  |
| Navigation | React Navigation v6     | Stable, well-documented           |
| Monorepo   | Yarn Workspaces + Turbo | Shared packages, fast builds      |

## Features

- **Log Mood** — 5-level emoji mood selector with timestamp auto-capture
- **Wellbeing Check-In** — 4 optional questions (sleep, energy, stress, social)
- **Notes** — Free-text note attached to each entry
- **Location** — GPS capture via `expo-location` (with graceful permission handling)
- **Dashboard** — 7-day bar chart, streak tracker, weekly averages, wellbeing breakdown
- **History** — Grouped chronological list with date filters and swipe-to-delete
- **Demo Data** — Load sample week of entries to showcase the dashboard

## Setup & Run

```bash
# Install dependencies (from repo root)
yarn install

# Start on iOS simulator
yarn ios

# Start on Android emulator
yarn android

# Start on Web (React Native Web)
yarn web
```

> **Note:** First run on iOS/Android requires Expo Go or a development build.

## Key Design Decisions

### Monorepo with shared packages

`@mood-tracker/store` and `@mood-tracker/ui` are workspace packages consumed by the mobile app. This mirrors how a team would share logic across multiple apps (e.g., a separate employer-facing app and a patient app).

### Redux Toolkit over Context

RTK gives us a clear, auditable action log, DevTools support, and scales well as features grow. Context would become unwieldy with multiple slices of state.

### No external chart library

The 7-day mood chart is built with React Native `View` components — no SVG dependency. This keeps the bundle small and the code readable.

### Graceful degradation on web

`expo-location` is mobile-only; `useLocation` checks `Platform.OS` and returns `null` on web without throwing.
