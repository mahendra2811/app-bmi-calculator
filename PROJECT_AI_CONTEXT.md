# BMI Calculator — AI Project Context

> **Purpose of this file**: Give any AI (Claude, ChatGPT, Gemini) or human reader a complete understanding of this project in one read. Also serves as my personal interview-prep cheat sheet.

---

## 1. Quick Snapshot (TL;DR)

- **Project ID**: `bmi-calculator`
- **Title**: BMI Calculator — Mobile App with Charts & Share
- **Category**: Mobile App / Health
- **Status**: Live
- **Year**: 2026
- **Role**: Solo Developer (Self)
- **Duration**: 2026-03
- **Local path**: `a_APP/2. BMI calculator /bmi-calculator/`
- **GitHub**: https://github.com/mahendra2811/app-bmi-calculator

## 2. One-Sentence Description
Expo (React Native) BMI calculator with persistent history charts, share-as-image cards, and a linear-gradient themed UI — built on the foundations I learned from Unit Converter.

## 3. Long Description
Cross-platform BMI calculator built with Expo + Expo Router. It computes BMI from height/weight inputs (metric + imperial), persists every reading via AsyncStorage, plots history with `react-native-chart-kit`, and lets users share their BMI card as an image using `react-native-view-shot` + `expo-sharing`. The UI is themed with `expo-linear-gradient` and uses `expo-symbols` for SF Symbols / Material icons. Designed to be friendlier for fitness-focused users in India who want a quick health gauge without sign-up.

## 4. Tech Stack
- **Framework**: Expo SDK, Expo Router
- **UI**: React Native, NativeWind + Tailwind
- **Storage**: `@react-native-async-storage/async-storage`
- **Navigation**: `@react-navigation/native`
- **Theming**: `expo-linear-gradient`
- **Native modules**: `expo-haptics`, `expo-linking`, `expo-sharing`, `expo-symbols`
- **Charts**: `react-native-chart-kit`, `react-native-svg`
- **Capture/Share**: `react-native-view-shot`
- **Animation**: `react-native-reanimated`, `react-native-worklets`
- **Date utils**: `date-fns`

## 5. Key Highlights
- History chart of past BMI readings via `react-native-chart-kit`
- Share BMI card image (uses `view-shot` to snapshot a React view → image)
- Linear-gradient themed UI (warm, premium feel)
- Localized icons via `expo-symbols`
- AsyncStorage persistence — works offline
- Haptic feedback on key interactions

## 6. Problem → Solution
- **Problem**: People want to track BMI but don't want to sign up to a health app, give camera permissions, or load ads.
- **Solution**: Offline-first, no-signup BMI tool that stores history locally and shares results as image cards (WhatsApp-friendly).

## 7. Architecture
- File-based routing (Expo Router) — likely `app/(tabs)/index.tsx`, `app/history.tsx`
- AsyncStorage as primary store (BMI entries with timestamps)
- `view-shot` snapshot of result card → `expo-sharing` to OS share sheet
- Chart kit reads AsyncStorage history and renders SVG

## 8. Important File Paths
- App icon: `assets/images/icon.png`
- Logo: `assets/images/logo.png`
- Splash: `assets/images/splash-icon.png`

## 9. Tags
`expo`, `react-native`, `health`, `bmi`, `chart-kit`, `view-shot`, `mobile`

---

## 10. Interview Questions I Should Be Ready For

### Beginner / Conceptual
1. What is BMI and what are its limitations as a health metric?
2. Why did you use AsyncStorage instead of a real database (SQLite, MMKV)?
3. What is `react-native-view-shot` and how does it work under the hood?
4. How does `react-native-chart-kit` differ from Victory Native or React Native Skia charts?
5. What is `expo-linear-gradient` and how does it compare to CSS linear-gradient?

### Architecture / Design
6. How would you support multiple users on the same device?
7. How would you sync this data to the cloud (e.g., Supabase / Firebase)?
8. How would you migrate the storage layer to MMKV or WatermelonDB?
9. How would you display BMI categories (Underweight / Normal / Overweight / Obese) — colour codes? Bands on the chart?
10. How would you let users set goal BMI and show progress?

### Implementation
11. How do you take a snapshot of a React component as an image?
12. How does the share sheet integration work on iOS vs Android?
13. How do you handle floating-point precision in BMI calculation?
14. How do you handle metric ↔ imperial conversion accurately?
15. How do you trigger haptic feedback only on physical button taps (not on render)?

### Edge Cases / Performance
16. What happens if AsyncStorage gets corrupted? How would you handle that?
17. How do you avoid re-rendering the entire chart when only one data point changes?
18. How do you handle very long history (e.g., 1000+ entries)?
19. How do you make the shared image look good on both light and dark mode previews?
20. How would you add unit tests for the BMI formula?

### Distribution
21. How does the EAS Build pipeline differ between dev and production?
22. How would you push OTA updates to existing users without going through Play Store review?

---

## 11. Extra Talking Points (Things to Bring Up Voluntarily)

- **Why view-shot was the killer feature**: WhatsApp share of a BMI image is way more shareable than a number — virality channel.
- **Why no backend**: Health data is sensitive (HIPAA-like). Keeping it 100% local = zero compliance overhead.
- **Why I built this**: Personal need + portfolio piece to demonstrate I can ship full mobile apps end-to-end (UI + storage + native integrations + Play/App Store publish).
- **Lessons from chart-kit**: Charts use SVG; performance is fine up to ~200 points. For more, I'd switch to Skia or Victory Native.
- **The trickiest bug**: `view-shot` capturing a view rendered inside a scrollable list — fix was to render an off-screen "card" component just for capture.
- **Future plans**: Goal-based BMI tracking, reminders via `expo-notifications`, calorie + waist-to-hip integration.

---

## 12. If I Need to Revisit This Project Later
Read in this order:
1. `package.json` — Expo SDK version and chart/share libs
2. `app/_layout.tsx` — navigation root
3. The BMI calc utility (likely `utils/bmi.ts` or in the screen file)
4. AsyncStorage helpers (look for `storage/` or `lib/storage.ts`)
5. The shareable card component (used by `view-shot`)

To run locally:
```bash
cd "a_APP/2. BMI calculator /bmi-calculator"
npm install
npx expo start
```

BMI formula reminder:
```
BMI = weight (kg) / (height (m))²
Imperial: BMI = (weight_lbs / (height_in)²) × 703
```

BMI bands (WHO):
- Underweight: < 18.5
- Normal: 18.5 – 24.9
- Overweight: 25 – 29.9
- Obese: ≥ 30
