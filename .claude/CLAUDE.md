# BMI Calculator - Project Intelligence

> **Read this file first.** It gives any new Claude session full context to start working immediately.

## What Is This Project?

A production-grade **BMI Calculator** mobile app built with React Native + Expo SDK 55. The goal is to **publish to Google Play Store and earn revenue** through AdMob ads and potentially a premium tier.

- **Built by:** Mahendra (Primathon)
- **Status:** Phase 1 COMPLETE (core app), Phase 2 PENDING (monetization + analytics)
- **Platforms:** Android (primary), iOS, Web (for testing)

## Quick Start

```bash
cd bmi-calculator
npx expo start          # Dev server (web: localhost:8081)
npx expo start --android  # Run on Android device/emulator
```

> **Important:** Always run commands from inside the `bmi-calculator/` folder, NOT the parent directory.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Expo SDK | 55 |
| Runtime | React Native | 0.83.2 |
| Language | TypeScript | 5.9 (strict) |
| Styling | NativeWind v4 (TailwindCSS) | 4.0 |
| Animations | react-native-reanimated | 4.2.1 |
| Navigation | expo-router (file-based) | 55.0.6 |
| Storage | @react-native-async-storage/async-storage | 2.2.0 |
| Charts | Custom SVG (react-native-svg) | 15.15.3 |
| Haptics | expo-haptics | 55.0.9 |
| Sharing | expo-sharing + React Native Share | 55.0.12 |

## Project Scale

- **14 screens** (4 tabs + 10 stack screens)
- **17 UI components** (GradientButton, BMIGauge, SliderInput, etc.)
- **8 animation wrappers** (FadeIn, SlideUp, ScalePress, StaggerList, etc.)
- **3 layout components** (GradientBackground, SafeContainer, PageHeader)
- **8 custom hooks** (useBMI, useHistory, useSettings, useTheme, etc.)
- **2 React contexts** (SettingsContext, ThemeContext)
- **9 utility modules** (bmiCalculator, storage, healthTips, etc.)
- **11 health metrics** calculated (BMI, BMI Prime, Body Fat %, BMR, Ideal Weight x3, etc.)
- **36+ health tips** across 5 categories
- **16 FAQ items**, full legal pages (privacy, terms, disclaimer)

## Key Architectural Decisions

1. **All data is local** — AsyncStorage only, no backend, no cloud
2. **Context API** for state (no Redux/Zustand) — only 2 contexts needed
3. **NativeWind v4** for styling — ALL styling via `className` prop
4. **Dark theme default** — purple/indigo gradient aesthetic (#0F0C29 -> #302B63 -> #24243E)
5. **File-based routing** via expo-router with typed routes
6. **Custom SVG chart** — replaced react-native-chart-kit to avoid web compatibility issues

## Critical: Do NOT Break These

- **babel.config.js** — `reanimated/plugin` MUST be the LAST plugin
- **NativeWind setup** — babel preset (`nativewind/babel`) + `tailwind.config.js` + `global.css` + `metro.config.js` (withNativeWind) are all interconnected
- **AsyncStorage keys** — changing keys in `utils/constants.ts` will lose all user data
- **Android package name** — currently `com.yourname.bmicalculator` (placeholder, update before publish)

## .env Variables (Placeholders — Fill Before Production)

```
EXPO_PUBLIC_ADMOB_BANNER_ID=        # AdMob banner ad unit ID
EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID=  # AdMob interstitial ad unit ID
EXPO_PUBLIC_ADMOB_APP_ID=           # AdMob app ID
EXPO_PUBLIC_FIREBASE_API_KEY=       # Firebase config
EXPO_PUBLIC_FIREBASE_PROJECT_ID=    # Firebase project
EXPO_PUBLIC_GA_MEASUREMENT_ID=      # Google Analytics
EXPO_PUBLIC_GTM_CONTAINER_ID=       # Google Tag Manager
```

## Current Status

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1 | DONE | Core app — all screens, animations, calculations, history, tips, settings |
| Phase 2 | NEXT | AdMob ads, Firebase Analytics, crash reporting |
| Phase 3 | TODO | Native device testing, performance, light theme, accessibility |
| Phase 4 | TODO | Play Store account, listing, build, submit |
| Phase 5 | TODO | Revenue optimization, ASO, premium tier, growth |

## Related Documentation

| File | Purpose |
|------|---------|
| [SESSION_LOG.md](SESSION_LOG.md) | What each Claude session accomplished |
| [ROADMAP.md](ROADMAP.md) | Detailed phase-by-phase task list |
| [ARCHITECTURE.md](ARCHITECTURE.md) | File structure, navigation, data flow, formulas |
| [PROJECT_MAP.md](PROJECT_MAP.md) | Every file in the project with descriptions |
| [MONETIZATION.md](MONETIZATION.md) | AdMob setup, premium tier, revenue estimates |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Play Store build and submission steps |
| [BUGS_AND_FIXES.md](BUGS_AND_FIXES.md) | Known issues and applied fixes |
| [CONVENTIONS.md](CONVENTIONS.md) | Code patterns, naming rules, do's and don'ts |
