# Bugs & Fixes Log

> Add new entries at the **TOP** of each section.
> Include date, description, root cause, and fix.

---

## Known Issues (Unfixed)

### 1. Light Theme Not Fully Implemented
- **Priority:** Low
- **Description:** Theme toggle exists in Settings but most screens use hardcoded dark colors (`text-white`, `bg-surface-dark`, etc.). Switching to light theme doesn't change backgrounds or text.
- **Root Cause:** NativeWind classes are hardcoded to dark palette throughout all screens.
- **Fix Needed:** Add conditional className based on `isDark` from `useTheme()`, or use NativeWind's `dark:` prefix.

### 2. Reminder Feature Is a Placeholder
- **Priority:** Low (Phase 3)
- **Description:** Settings has a "Reminders" toggle but it only saves the boolean — no actual reminders are sent.
- **Root Cause:** No push notification setup.
- **Fix Needed:** Install `expo-notifications`, set up scheduled local notifications when `reminderEnabled` is true.

### 3. Android Package Name Is Placeholder
- **Priority:** MUST FIX before Play Store submission
- **Description:** `app.json` has `com.yourname.bmicalculator`
- **Fix:** Change to real package name (e.g., `com.mahendra.bmicalculator`)

### 4. Rate App Links to Generic Play Store
- **Priority:** Fix before launch
- **Description:** Settings "Rate this App" opens `https://play.google.com/store` (generic)
- **Fix:** After publishing, update to actual app listing URL: `https://play.google.com/store/apps/details?id=<package-name>`

### 5. Support Email Is Placeholder
- **Priority:** Fix before launch
- **Description:** `support@bmicalculator.app` appears in constants.ts, .env, and contact screen
- **Fix:** Set up actual email or use personal Gmail

### 6. Tab Bar Icons Are Emoji Text
- **Priority:** Cosmetic, low
- **Description:** Tab icons use emoji (`Text` component) instead of `@expo/vector-icons`
- **Root Cause:** Quick implementation choice during initial build
- **Fix:** Replace with `Ionicons` or `MaterialIcons` from `@expo/vector-icons`

### 7. No Unit Tests
- **Priority:** Medium
- **Description:** Zero tests in the project
- **Fix Needed:** Add Jest + React Native Testing Library. Start with `utils/bmiCalculator.ts` (pure functions, easiest to test).

---

## Fixed Issues

### [March 18, 2025] react-native-chart-kit Web Warnings
- **Problem:** `onResponderTerminate` and other responder warnings flooding console on web
- **Root Cause:** `react-native-chart-kit` passes React Native gesture props to SVG DOM elements on web
- **Fix:** Replaced `react-native-chart-kit` `LineChart` with custom SVG chart using `react-native-svg` directly in `components/ui/HistoryChart.tsx`

### [March 18, 2025] History Not Updating After Save
- **Problem:** Saving BMI result on Result screen, then switching to History tab showed old/empty data
- **Root Cause:** `useHistory` hook's `addEntry` captured stale `history` array in closure. Each screen had its own hook instance with independent state.
- **Fix:** (1) `addEntry`/`deleteEntry` now read fresh from AsyncStorage before modifying. (2) Added `useFocusEffect` to auto-refresh history when tab gains focus.
- **File:** `hooks/useHistory.ts`

### [March 18, 2025] Share Button Crash on Web
- **Problem:** `Share.share()` throws "Share is not supported in this browser" error on web
- **Root Cause:** React Native's `Share` API doesn't work on web
- **Fix:** Added `Platform.OS === 'web'` check. Web uses `navigator.share()` if available, falls back to `navigator.clipboard.writeText()`, last resort shows Alert with text.
- **Files:** `app/result.tsx`, `app/(tabs)/settings.tsx`

### [March 18, 2025] Alert.alert() Silent Failure on Web
- **Problem:** "Clear History", "Reset Settings", "Delete Entry" buttons did nothing on web
- **Root Cause:** `Alert.alert()` from React Native doesn't work on web
- **Fix:** Replaced with inline in-app confirmation UI — "Are you sure?" with Cancel/Confirm buttons rendered inside the component. No system dialogs.
- **Files:** `app/(tabs)/history.tsx`, `app/(tabs)/settings.tsx`

### [March 18, 2025] expo-haptics PluginError
- **Problem:** `npx expo start` failed with "PluginError: Unable to resolve a valid config plugin for expo-haptics"
- **Root Cause:** `"expo-haptics"` was listed in `app.json` plugins array, but it doesn't need a config plugin
- **Fix:** Removed `"expo-haptics"` from `app.json` plugins. The library works fine without a plugin entry.
- **File:** `app.json`

### [March 18, 2025] npx expo start From Wrong Directory
- **Problem:** `npx expo start` failed because it was run from the parent folder
- **Root Cause:** User ran the command from `/2. BMI calculator/` instead of `/2. BMI calculator/bmi-calculator/`
- **Fix:** Must `cd bmi-calculator` first. All expo commands must run from inside the project directory.

---

## Template for New Bugs

```markdown
### [Date] Issue Title
- **Problem:** What happened
- **Root Cause:** Why it happened
- **Fix:** What was changed
- **File(s):** Which files were modified
```
