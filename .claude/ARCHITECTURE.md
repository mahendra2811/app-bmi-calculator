# Architecture — BMI Calculator

## Navigation Structure

```
Root Stack Navigator (headerShown: false, slide_from_right)
│
├── (tabs) — Bottom Tab Navigator (4 tabs)
│   ├── index.tsx        ⚖️ Calculate — Main BMI input form
│   ├── history.tsx      📊 History  — Past calculations + chart
│   ├── tips.tsx         💡 Tips     — Health tips with category filters
│   └── settings.tsx     ⚙️ Settings — Preferences, data, legal links
│
├── result.tsx           — BMI results with gauge + 8 stat cards
├── onboarding.tsx       — 3-slide intro (fade animation)
├── privacy-policy.tsx   — Privacy policy (legal content)
├── terms-conditions.tsx — Terms & conditions (legal content)
├── disclaimer.tsx       — Medical disclaimer (legal content)
├── how-it-works.tsx     — BMI explanation, formula, history
├── bmi-chart.tsx        — BMI category reference chart (scrollable table)
├── faq.tsx              — FAQ accordion (16 items)
├── contact.tsx          — Feedback + rating + report bug
├── about.tsx            — App info + tech stack
└── licenses.tsx         — Open source licenses list
```

## Data Flow

### BMI Calculation Flow
```
Calculator (index.tsx)
  → User inputs: gender, age, height, weight
  → "Calculate BMI" button
  → router.push('/result', { gender, age, height, weight })

Result (result.tsx)
  → Reads params via useLocalSearchParams()
  → Computes 11 metrics via utils/bmiCalculator.ts
  → Renders BMIGauge + 8 StatCards
  → "Save" → useHistory().addEntry() → AsyncStorage
  → "Share" → Share.share() or clipboard (web)
  → "Recalculate" → router.back()
```

### State Management

```
App Providers (app/_layout.tsx):
  GestureHandlerRootView
    └── SafeAreaProvider
        └── ThemeProvider (context/ThemeContext.tsx)
            └── SettingsProvider (context/SettingsContext.tsx)
                └── Stack Navigator
```

| State | Provider | Hook | Storage Key | Type |
|-------|----------|------|-------------|------|
| Theme | ThemeContext | useTheme() | `@bmi_theme` | `'dark' \| 'light'` |
| Settings | SettingsContext | useSettings() | `@bmi_settings` | `UserSettings` |
| History | None (hook-only) | useHistory() | `@bmi_history` | `HistoryEntry[]` |
| Onboarding | None (hook-only) | useOnboarding() | `@bmi_onboarding_completed` | `boolean` |
| Rating | None (local state) | — | `@bmi_app_rating` | `number` |

### AsyncStorage Keys (utils/constants.ts)
```typescript
STORAGE_KEYS = {
  HISTORY:    '@bmi_history',           // HistoryEntry[]
  SETTINGS:   '@bmi_settings',          // UserSettings
  THEME:      '@bmi_theme',             // 'dark' | 'light'
  ONBOARDING: '@bmi_onboarding_completed', // boolean
  RATING:     '@bmi_app_rating',        // number
}
```

## Component Hierarchy Pattern

Every screen follows this exact structure:
```tsx
<GradientBackground>          // LinearGradient (#0F0C29 → #302B63 → #24243E)
  <SafeContainer>             // SafeAreaView + ScrollView (paddingHorizontal: 16)
    <PageHeader title="..." /> // Back button + title (stack screens only)
    <FadeIn>                  // Animation wrapper
      {/* Screen content */}
    </FadeIn>
  </SafeContainer>
</GradientBackground>
```

For list screens (History, Tips, FAQ, Licenses):
```tsx
<GradientBackground>
  <SafeContainer scrollable={false}>   // No ScrollView (FlatList handles scrolling)
    <FlatList ... />
  </SafeContainer>
</GradientBackground>
```

## Health Metrics & Formulas (utils/bmiCalculator.ts)

| # | Metric | Formula | Function |
|---|--------|---------|----------|
| 1 | BMI | weight(kg) / height(m)^2 | `calculateBMI()` |
| 2 | BMI Prime | BMI / 25 | `calculateBMIPrime()` |
| 3 | Ponderal Index | weight(kg) / height(m)^3 | `calculatePonderalIndex()` |
| 4 | Body Fat % | (1.20 x BMI) + (0.23 x age) - (10.8 x gender) - 5.4 | `calculateBodyFatPercentage()` |
| 5 | BMR (Male) | (10 x weight) + (6.25 x height) - (5 x age) + 5 | `calculateBMR()` |
| 6 | BMR (Female) | (10 x weight) + (6.25 x height) - (5 x age) - 161 | `calculateBMR()` |
| 7 | Ideal Weight (Devine) | Male: 50 + 2.3(inches-60), Female: 45.5 + 2.3(inches-60) | `calculateIdealWeight()` |
| 8 | Ideal Weight (Robinson) | Male: 52 + 1.9(inches-60), Female: 49 + 1.7(inches-60) | `calculateIdealWeight()` |
| 9 | Ideal Weight (Miller) | Male: 56.2 + 1.41(inches-60), Female: 53.1 + 1.36(inches-60) | `calculateIdealWeight()` |
| 10 | Healthy Weight Range | BMI 18.5-24.9 applied to height | `calculateHealthyWeightRange()` |
| 11 | Weight to Change | Distance to healthy range boundary | `calculateWeightToChange()` |

## BMI Categories (utils/bmiCategories.ts — WHO Classification)

| Category | BMI Range | Color | Emoji |
|----------|-----------|-------|-------|
| Severe Thinness | < 16.0 | #60A5FA | 🔵 |
| Moderate Thinness | 16.0 - 16.9 | #60A5FA | 🔵 |
| Mild Thinness | 17.0 - 18.4 | #93C5FD | 🫥 |
| Normal | 18.5 - 24.9 | #34D399 | 💚 |
| Overweight | 25.0 - 29.9 | #FBBF24 | ⚠️ |
| Obese Class I | 30.0 - 34.9 | #FB923C | 🟠 |
| Obese Class II | 35.0 - 39.9 | #F87171 | 🔴 |
| Obese Class III | >= 40.0 | #EF4444 | 🚨 |

## Type Definitions (types/index.ts)

```typescript
BMIResult        // Complete calculation result object
BMICategory      // { name, color, emoji, description, range: {min, max} }
HistoryEntry     // { id, date, bmi, category, weight, height, age, gender, unit }
UserSettings     // { name, unitSystem, theme, hapticEnabled, reminderEnabled, onboardingCompleted }
HealthTip        // { id, title, description, fullText, category, emoji, bmiCategories }
FAQItem          // { question, answer }
OnboardingSlide  // { title, subtitle, emoji, gradientColors }
```

## Color Palette (tailwind.config.js)

```
Primary:  #667EEA → #764BA2 (purple gradient)
Accent:   #F5576C (pink/red)
Surface:  { dark: #1E1E3F, light: #F8F9FA }
Success:  #34D399 → #059669 (green)
Background: #0F0C29 → #302B63 → #24243E (dark gradient)

BMI Colors:
  underweight: #60A5FA  normal: #34D399  overweight: #FBBF24
  obese1: #FB923C  obese2: #F87171  obese3: #EF4444
```
