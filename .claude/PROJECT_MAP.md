# Project Map — BMI Calculator

> Every file in the project with a one-line description.
> Organized bottom-to-top (deepest directories first, root files last).

---

## assets/fonts/

| File | Description |
|------|-------------|
| `SpaceMono-Regular.ttf` | Monospace font used for numerical displays |

## assets/images/

| File | Description |
|------|-------------|
| `icon.png` | Main app icon (512x512) |
| `splash-icon.png` | Splash screen icon |
| `favicon.png` | Web favicon |
| `android-icon-foreground.png` | Android adaptive icon foreground layer |
| `android-icon-background.png` | Android adaptive icon background layer |
| `android-icon-monochrome.png` | Android monochrome icon variant |

---

## types/

| File | Description |
|------|-------------|
| `index.ts` | All TypeScript interfaces: `BMIResult`, `BMICategory`, `HistoryEntry`, `UserSettings`, `HealthTip`, `FAQItem`, `OnboardingSlide` |

---

## utils/

| File | Description |
|------|-------------|
| `bmiCalculator.ts` | Core calculation engine — 11 functions: `calculateBMI`, `getBMICategory`, `calculateBMIPrime`, `calculatePonderalIndex`, `calculateBodyFatPercentage`, `calculateBMR`, `calculateIdealWeight` (3 formulas), `calculateHealthyWeightRange`, `calculateWeightToChange`, plus unit converters (`cmToFeetInches`, `feetInchesToCm`, `kgToLbs`, `lbsToKg`) |
| `bmiCategories.ts` | 8 BMI categories (WHO classification) with name, range, color, emoji, description. Exports `BMI_CATEGORIES` array and `BMI_COLORS` |
| `constants.ts` | App-wide constants: `STORAGE_KEYS` (5 AsyncStorage keys), `DEFAULT_SETTINGS`, `BMI_RANGES`, `ACTIVITY_LEVELS` (5 levels with multipliers), `APP_CONFIG` |
| `storage.ts` | AsyncStorage wrapper: `storeData<T>()`, `getData<T>()`, `removeData()`, `clearAll()` — all with try/catch error handling |
| `healthTips.ts` | 36+ health tips across 5 categories (diet, exercise, lifestyle, mental_health, sleep) — each has id, title, description, fullText, emoji, bmiCategories |
| `faqData.ts` | 16 FAQ items with question and full answer text |
| `onboardingData.ts` | 3 onboarding slides: Welcome, Smart Analysis, Track Progress — each with title, subtitle, emoji, gradient colors |
| `legalContent.ts` | Full legal text for `privacyPolicy`, `termsAndConditions`, `medicalDisclaimer` — each has lastUpdated date and sections array |
| `analytics.ts` | Stub analytics functions: `trackEvent()`, `setUserProperty()`, `trackScreen()` — all no-ops gated by env variable, ready for Firebase integration |

---

## context/

| File | Description |
|------|-------------|
| `ThemeContext.tsx` | Theme provider — manages `'dark' | 'light'` state, persists to AsyncStorage key `@bmi_theme`, exposes `theme`, `isDark`, `toggleTheme()` |
| `SettingsContext.tsx` | Settings provider — manages `UserSettings` state, persists to AsyncStorage key `@bmi_settings`, exposes `settings`, `updateSettings()`, `resetSettings()` |

---

## hooks/

| File | Description |
|------|-------------|
| `useBMI.ts` | Computes full `BMIResult` object from weight, height, age, gender using `useMemo` — calls all 11 calculator functions |
| `useHistory.ts` | History CRUD with AsyncStorage — `addEntry()`, `deleteEntry()`, `clearHistory()`, `refreshHistory()`. Uses `useFocusEffect` to auto-refresh on screen focus. Reads fresh from storage to avoid stale closures |
| `useSettings.ts` | Thin wrapper: `useContext(SettingsContext)` — returns `settings`, `updateSettings`, `resetSettings` |
| `useTheme.ts` | Thin wrapper: `useContext(ThemeContext)` — returns `theme`, `isDark`, `toggleTheme` |
| `useOnboarding.ts` | Manages onboarding completion flag in AsyncStorage (`@bmi_onboarding_completed`) |
| `useAds.ts` | Ad management stub — `showBanner()`, `showInterstitial()`, `incrementCalculationCount()` — env-gated, ready for AdMob integration |
| `useAnalytics.ts` | Analytics stub — wraps `utils/analytics.ts` functions |
| `useHaptics.ts` | Haptic feedback wrapper — calls `expo-haptics` with Platform.OS check |

---

## components/animations/

| File | Description |
|------|-------------|
| `FadeIn.tsx` | Fade-in animation wrapper with configurable `delay` and `duration`. Respects `useReducedMotion()` |
| `SlideUp.tsx` | Slide-up entrance animation with configurable offset and delay |
| `BounceDrop.tsx` | Bounce-drop animation (element drops in with bounce easing) |
| `ScalePress.tsx` | Scale-down-on-press animation for interactive elements. Wraps children in `Pressable` with spring animation |
| `PulseEffect.tsx` | Continuous pulsing animation (scale 1.0 ↔ 1.05) |
| `CountUpText.tsx` | Animated number counter — counts from 0 to target value with easing |
| `ShimmerLoader.tsx` | Shimmer/skeleton loading animation placeholder |
| `StaggerList.tsx` | Renders children with staggered entrance delays (configurable `staggerDelay`) |

---

## components/layout/

| File | Description |
|------|-------------|
| `GradientBackground.tsx` | Full-screen `LinearGradient` wrapper with 3 color stops (#0F0C29 → #302B63 → #24243E). Used as outer wrapper for every screen |
| `SafeContainer.tsx` | `SafeAreaView` + optional `ScrollView` with padding (16px horizontal, 32px bottom). Props: `scrollable` (default true), `className` |
| `PageHeader.tsx` | Header with back button (rounded, bg-white/10) + title text. Back button calls `router.back()` with haptic feedback. Props: `title`, `showBack` (default true) |

---

## components/ui/

| File | Description |
|------|-------------|
| `GradientButton.tsx` | Pressable button with `LinearGradient` background, `ScalePress` animation. Props: `title`, `onPress`, `colors` (gradient pair), `disabled` |
| `SliderInput.tsx` | Slider for height/weight input — shows label, current value, unit, and optional unit toggle button. Uses React Native `Slider` component |
| `GenderSelector.tsx` | Male/Female toggle buttons in a row. Selected state shows colored border + tinted background. Responsive: full-width on mobile, centered 400px on tablet |
| `AgeWheel.tsx` | Age picker with −/+ buttons flanking a large number display. Range: 2-120 years |
| `BMIGauge.tsx` | Animated SVG semicircular gauge — needle points to BMI value, colored arc segments for categories, displays BMI number and category name/emoji |
| `StatCard.tsx` | Card displaying a single health metric — emoji icon, title, value, optional subtitle. Used on Result screen (8 cards) |
| `CategoryBadge.tsx` | Small badge showing BMI category name with colored background and emoji |
| `AnimatedCard.tsx` | `Pressable` card with glass-morphism styling + `FadeIn` entrance animation. Props: `onPress`, `delay`, `className` |
| `TipCard.tsx` | Expandable health tip card — shows emoji + title collapsed, full text when expanded |
| `FilterChip.tsx` | Small pressable chip for category filtering (used in Tips screen). Active state: primary color, inactive: white/10 |
| `ToggleSwitch.tsx` | Animated on/off toggle using Reanimated. Track changes color, thumb slides with spring animation. Haptic feedback on toggle |
| `SettingsRow.tsx` | Single row in settings group — emoji + label + optional value + optional chevron. Haptic feedback on press |
| `EmptyState.tsx` | Centered placeholder for empty lists — large emoji, title, subtitle, optional action button |
| `HistoryChart.tsx` | Custom SVG line chart showing BMI trend over time — polyline, dots, Y-axis labels, X-axis date labels. Built with react-native-svg (replaced react-native-chart-kit) |
| `OnboardingSlide.tsx` | Single onboarding slide — large emoji, title, subtitle with gradient background |
| `CircularProgress.tsx` | SVG circular progress indicator with animated stroke |
| `AdBannerPlaceholder.tsx` | Placeholder component for ad banner — shows "Ad Space" text in a bordered box. To be replaced with real AdMob `BannerAd` in Phase 2 |

---

## components/ (root-level legacy files)

| File | Description |
|------|-------------|
| `Themed.tsx` | Themed `Text` and `View` components with light/dark color support (from Expo template) |
| `StyledText.tsx` | Styled text wrapper using MonoText font (from Expo template) |
| `ExternalLink.tsx` | Opens URLs in external browser using `expo-web-browser` |
| `useClientOnlyValue.ts` | Returns a value only on client side (SSR compatibility) |
| `useClientOnlyValue.web.ts` | Web-specific implementation of useClientOnlyValue |
| `useColorScheme.ts` | Detects system color scheme (dark/light) |
| `useColorScheme.web.ts` | Web-specific color scheme detection |

---

## app/(tabs)/

| File | Description |
|------|-------------|
| `_layout.tsx` | Tab navigator layout — 4 tabs: Calculate (⚖️), History (📊), Tips (💡), Settings (⚙️). Dark tab bar styling with primary-400 active tint |
| `index.tsx` | **Calculator screen** — Main input form: GenderSelector, AgeWheel, SliderInput (height with cm/ft toggle), SliderInput (weight with kg/lbs toggle), "Calculate BMI" GradientButton → navigates to `/result` with params |
| `history.tsx` | **History screen** — SVG chart header + FlatList of history entries. Each entry shows date, BMI value, category badge, delete button with inline confirm. "Clear All" with inline confirm. Empty state when no data |
| `tips.tsx` | **Tips screen** — "Tip of the Day" rotating card + horizontal FilterChip scroll (All, Diet, Exercise, Lifestyle, Mental Health, Sleep) + expandable TipCard list |
| `settings.tsx` | **Settings screen** — User profile card (name input, latest BMI), Preferences section (4 toggles: Imperial Units, Dark Theme, Haptic Feedback, Reminders), Data section (Export History, Clear History with InlineConfirm, Reset Settings with InlineConfirm), Legal & Info section (9 navigation rows), Rate/Share section |

---

## app/ (stack screens)

| File | Description |
|------|-------------|
| `_layout.tsx` | **Root layout** — `GestureHandlerRootView` > `SafeAreaProvider` > `ThemeProvider` > `SettingsProvider` > `Stack`. Imports `global.css`. Hides splash screen on mount. Registers all 12 stack screens |
| `result.tsx` | **Result screen** — Computes 11 health metrics from route params. Shows `BMIGauge` + 8 `StatCards`. Save button (writes to AsyncStorage, shows "Saved" state), Share button (platform-aware), Recalculate button |
| `onboarding.tsx` | **Onboarding screen** — Horizontal `FlatList` with 3 slides, dot indicators, Skip/Next buttons, "Get Started" on last slide → marks onboarding complete + navigates to tabs |
| `privacy-policy.tsx` | **Privacy Policy** — PageHeader + sections from `utils/legalContent.ts > privacyPolicy` |
| `terms-conditions.tsx` | **Terms & Conditions** — PageHeader + sections from `utils/legalContent.ts > termsAndConditions` |
| `disclaimer.tsx` | **Medical Disclaimer** — Warning banner + sections from `utils/legalContent.ts > medicalDisclaimer` |
| `how-it-works.tsx` | **How BMI Works** — 6 AnimatedCards: What is BMI, The Formula, History, WHO Categories table, Limitations (7 bullet points), Alternatives, When to See a Doctor |
| `bmi-chart.tsx` | **BMI Reference Chart** — Color legend + horizontally scrollable table (11 heights x 11 weights) with color-coded BMI values |
| `faq.tsx` | **FAQ** — FlatList of 16 expandable question/answer items with haptic feedback |
| `contact.tsx` | **Contact** — Send Feedback (mailto link), Report Bug (mailto link), Rate App (1-5 stars saved to AsyncStorage), "Rate on Play Store" button |
| `about.tsx` | **About** — App icon, version, 4 feature cards, tech stack badges, developer credit |
| `licenses.tsx` | **Licenses** — FlatList of 13 open source libraries with name, version, license type, expandable MIT text |
| `+not-found.tsx` | **404 screen** — "Page not found" with link back to home |

---

## Root Configuration Files

| File | Description |
|------|-------------|
| `app.json` | Expo config — app name "BMI Calculator", portrait orientation, splash (#0F0C29), Android package `com.yourname.bmicalculator`, plugins: expo-router + expo-sharing, typed routes enabled |
| `eas.json` | EAS Build config — 3 profiles: development (dev client), preview (internal), production (app-bundle AAB) |
| `package.json` | Dependencies (30+ packages), scripts: start/android/ios/web, entry point: expo-router/entry |
| `tsconfig.json` | TypeScript strict mode, extends expo/tsconfig.base, includes nativewind-env.d.ts |
| `tailwind.config.js` | NativeWind theme — custom colors (primary, accent, surface, success, bmi), content paths for all .tsx files |
| `babel.config.js` | Babel config — presets: [babel-preset-expo, nativewind/babel], plugins: [reanimated/plugin] (MUST be last) |
| `metro.config.js` | Metro bundler config — `withNativeWind()` wrapper pointing to `global.css` |
| `global.css` | Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;` |
| `.env` | Environment variables — AdMob IDs, Firebase keys, GA ID (all empty placeholders), app name/version/email (populated) |
| `.gitignore` | Git ignore rules — node_modules, .expo, dist, etc. |
| `nativewind-env.d.ts` | TypeScript reference for NativeWind types |
| `expo-env.d.ts` | TypeScript reference for Expo types |

---

## .claude/ (This Documentation)

| File | Description |
|------|-------------|
| `CLAUDE.md` | Main project intelligence — read first for full context |
| `SESSION_LOG.md` | Append-only log of what each Claude session accomplished |
| `ROADMAP.md` | Phased task list: Phase 1 (done) → Phase 6 (backlog) |
| `ARCHITECTURE.md` | Navigation flow, data flow, state management, formulas, types |
| `PROJECT_MAP.md` | This file — every file with descriptions |
| `MONETIZATION.md` | Revenue strategy: AdMob + premium tier + IAP |
| `DEPLOYMENT.md` | Play Store build and submission guide |
| `BUGS_AND_FIXES.md` | Known issues + fixed issues log |
| `CONVENTIONS.md` | Code patterns, naming rules, screen template, do's/don'ts |
