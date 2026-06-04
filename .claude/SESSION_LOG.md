# Session Log

> Each Claude session should add an entry at the **TOP** of the sessions list below.
> This file is append-only (newest first). It gives future sessions a history of all work done.

---

## Session 3: March 18, 2025 — Documentation & Memory Setup

### What Was Done
- Created `.claude/` folder with 9 comprehensive documentation files
- Documented full project architecture, conventions, roadmap, monetization plan
- Created PROJECT_MAP.md with bottom-to-top file descriptions
- Set up SESSION_LOG.md template for future session tracking

### What Was NOT Done
- No code changes in this session (documentation only)

### Key Decisions
- Chose 9-file documentation structure covering all aspects of the project
- SESSION_LOG.md is append-only (newest first) so sessions can quickly see recent work

---

## Session 2: March 18, 2025 — Bug Fixes & Web Compatibility

### What Was Done
- Fixed `Share.share()` crash on web in result.tsx — added Platform.OS check with `navigator.share` / `navigator.clipboard` fallback
- Fixed `Alert.alert()` not working on web in history.tsx — replaced with inline confirmation UI (Cancel/Confirm buttons in-card)
- Fixed `Alert.alert()` not working on web in settings.tsx — replaced with `InlineConfirm` component for Clear History and Reset Settings
- Fixed stale history data bug — `useHistory` hook's `addEntry` had stale closure; now reads fresh from AsyncStorage + uses `useFocusEffect` to auto-refresh on tab focus
- Fixed `react-native-chart-kit` web warnings (`onResponderTerminate`) — replaced with custom SVG chart using react-native-svg
- Fixed GenderSelector tablet layout — added `useWindowDimensions` to center at 400px on tablet while staying full-width on mobile
- Fixed Save button — added `saved` state to prevent duplicate saves, button changes to "Saved" after saving
- Fixed Export History — now uses web-safe `shareText()` helper, shows "Exported!" feedback
- Fixed "Rate this App" — changed from placeholder Alert to actual `Linking.openURL()` for Play Store
- Fixed "Rate this App" and "Share App" layout — moved into proper styled card matching other settings sections

### What Was NOT Done
- No new features added
- No native device testing

### Key Decisions
- Replaced all `Alert.alert()` calls with inline in-app confirmation UI (no system dialogs)
- Replaced `react-native-chart-kit` with custom SVG chart to eliminate web compatibility issues
- `useHistory` now reads fresh from AsyncStorage on every operation (avoids stale closures)

---

## Session 1: March 18, 2025 — Full App Build (Initial Creation)

### What Was Done
- Set up complete Expo SDK 55 project with TypeScript, NativeWind v4, Reanimated 4
- Created all 74 source files from scratch:
  - **14 screens**: Calculator, History, Tips, Settings, Result, Onboarding, Privacy Policy, Terms, Disclaimer, How It Works, BMI Chart, FAQ, Contact, About, Licenses, 404
  - **17 UI components**: GradientButton, BMIGauge (SVG animated gauge), SliderInput, GenderSelector, AgeWheel, AnimatedCard, StatCard, CategoryBadge, TipCard, FilterChip, ToggleSwitch, SettingsRow, EmptyState, HistoryChart, OnboardingSlide, CircularProgress, AdBannerPlaceholder
  - **8 animation wrappers**: FadeIn, SlideUp, BounceDrop, ScalePress, PulseEffect, CountUpText, ShimmerLoader, StaggerList
  - **3 layout components**: GradientBackground, SafeContainer, PageHeader
  - **8 hooks**: useBMI, useHistory, useSettings, useTheme, useOnboarding, useAds, useAnalytics, useHaptics
  - **2 contexts**: SettingsContext, ThemeContext
  - **9 utils**: bmiCalculator (11 health metrics), bmiCategories, constants, storage, healthTips (36+ tips), faqData, onboardingData, legalContent, analytics
- Implemented 11 health metrics: BMI, BMI Prime, Ponderal Index, Body Fat %, BMR, Ideal Weight (Devine/Robinson/Miller), Healthy Weight Range, Weight to Change, Daily Calories
- Full onboarding flow (3 slides)
- History with AsyncStorage persistence, chart, delete, clear
- 36+ health tips across 5 categories with Tip of the Day
- Settings: name, units (metric/imperial), theme toggle, haptics, reminders, export, clear, reset
- Legal pages with full content (privacy, terms, disclaimer)
- Info pages: How BMI Works, BMI Chart, FAQ, Contact, About, Licenses
- Share/export functionality
- Ad placeholder stubs for Phase 2
- App icons and splash screen configured
- Successfully compiled and tested on web (21 routes bundled)

### What Was NOT Done
- AdMob SDK integration (placeholders only)
- Firebase Analytics (hooks stubbed but empty)
- Reminders feature (toggle exists, no implementation)
- Native device testing
- Play Store build/submission
- Unit tests
- Light theme (dark theme only)

### Key Decisions
- Used Context API over Redux (only 2 contexts needed)
- All data local-only (AsyncStorage) — no backend for v1
- NativeWind v4 className approach for all styling
- BMI categories follow WHO classification (8 categories)
- Health metrics use standard medical formulas (Mifflin-St Jeor for BMR, Deurenberg for body fat)
- expo-haptics removed from app.json plugins (doesn't need a config plugin entry)

### Errors Encountered & Resolved
- `expo-haptics` PluginError: removed from `app.json` plugins array
- `npx expo start` failing: was run from parent directory instead of `bmi-calculator/`
- Subagent permissions denied: all 74 files created directly by main agent

---

## Template for New Sessions

```markdown
## Session N: [Date] — [Brief Title]

### What Was Done
- [Bullet points of completed work]

### What Was NOT Done
- [Bullet points of incomplete/deferred work]

### Key Decisions
- [Bullet points of important decisions made]
```
