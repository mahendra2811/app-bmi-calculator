# Roadmap — BMI Calculator

> **Goal:** Publish to Google Play Store and earn revenue through ads, premium features, and growth.

---

## Phase 1: Core App — COMPLETED

- [x] Project setup (Expo SDK 55, TypeScript, NativeWind v4, Reanimated 4)
- [x] Calculator screen (gender, age, height, weight inputs with unit toggle)
- [x] 11 health metrics (BMI, BMI Prime, Ponderal Index, Body Fat %, BMR, Ideal Weight x3, Healthy Range, Weight to Change, Daily Calories)
- [x] Result screen with animated SVG gauge + 8 stat cards
- [x] Save results to AsyncStorage history
- [x] Share results (native + web clipboard fallback)
- [x] History screen with custom SVG chart + CRUD operations
- [x] Tips screen (36+ tips, 5 categories, Tip of the Day, expandable cards)
- [x] Settings screen (name, units, theme, haptics, reminders, export, clear, reset)
- [x] Onboarding flow (3 slides)
- [x] Legal pages (Privacy Policy, Terms & Conditions, Medical Disclaimer)
- [x] Info pages (How BMI Works, BMI Chart, FAQ, Contact, About, Licenses)
- [x] Dark theme with purple/indigo gradient aesthetic
- [x] 8 animation types (FadeIn, SlideUp, BounceDrop, ScalePress, PulseEffect, CountUpText, ShimmerLoader, StaggerList)
- [x] App icons and splash screen assets
- [x] Web compatibility fixes (Share, Alert, Chart)

---

## Phase 2: Monetization & Analytics — NEXT PRIORITY

- [ ] **AdMob Integration**
  - [ ] Install `react-native-google-mobile-ads`
  - [ ] Create AdMob account and ad units (banner + interstitial)
  - [ ] Add ad unit IDs to `.env`
  - [ ] Replace `AdBannerPlaceholder` with real `BannerAd` component
  - [ ] Add interstitial ad after every 3rd BMI calculation
  - [ ] Implement real logic in `useAds` hook
  - [ ] Test with Google's test ad IDs first

- [ ] **Firebase Analytics**
  - [ ] Create Firebase project
  - [ ] Add Firebase config to `.env`
  - [ ] Install `@react-native-firebase/app` + `@react-native-firebase/analytics`
  - [ ] Implement `trackEvent`, `trackScreen`, `setUserProperty` in `utils/analytics.ts`
  - [ ] Track key events: `bmi_calculated`, `result_saved`, `result_shared`, `tip_viewed`, `history_cleared`, `settings_changed`
  - [ ] Add screen tracking to all 14 screens

- [ ] **Crash Reporting**
  - [ ] Install `@react-native-firebase/crashlytics`
  - [ ] Test crash reporting in development

---

## Phase 3: Native Testing & Polish

- [ ] Test on physical Android device (not just web)
- [ ] Fix any Android-specific UI issues
- [ ] Performance profiling (FlatList scrolling, animation frame drops)
- [ ] Implement light theme properly (currently dark-only)
- [ ] Implement push notification reminders (expo-notifications)
- [ ] Accessibility audit (screen reader, contrast, touch targets)
- [ ] Replace tab bar emoji icons with `@expo/vector-icons` (Ionicons)
- [ ] Update Android package name from `com.yourname.bmicalculator` to real name
- [ ] Fill all `.env` placeholder values
- [ ] Update support email to real email
- [ ] Update Play Store URL in Rate/Share buttons

---

## Phase 4: Play Store Deployment

- [ ] Create Google Play Developer Account ($25 one-time fee)
- [ ] Finalize app listing (title, description, screenshots, feature graphic)
- [ ] Take 5-8 screenshots at 1080x1920/1080x2400
- [ ] Create feature graphic (1024x500)
- [ ] Generate signed AAB via `eas build --platform android --profile production`
- [ ] Set up Play Console: content rating, target audience, data safety declaration
- [ ] Submit to internal testing track first
- [ ] Fix any issues from testing
- [ ] Promote to production
- [ ] Set up `play-store-key.json` for EAS Submit (automated)

---

## Phase 5: Growth & Revenue Optimization

- [ ] Monitor ad revenue, fill rates, eCPM
- [ ] A/B test interstitial frequency (every 3rd vs 5th calculation)
- [ ] Implement in-app review API (prompt after 5th calculation or 3 days)
- [ ] ASO optimization (keywords, screenshots, description)
- [ ] Consider premium/pro tier:
  - Remove ads ($3.99 one-time or $2.99/month)
  - PDF report generation
  - Detailed trend analysis
  - Custom health goals
- [ ] Add more health calculators (WHR, macro calculator, calorie counter)
- [ ] Social sharing incentives
- [ ] Localization (Hindi, Spanish, etc.)

---

## Phase 6: Future Features (Backlog)

- [ ] Body measurement tracking (waist, hip, neck)
- [ ] Goal setting with progress notifications
- [ ] Weekly/monthly health reports
- [ ] Google Fit / Apple Health integration
- [ ] Water intake tracker
- [ ] Meal logging (basic)
- [ ] Exercise log
- [ ] Home screen widget
- [ ] Wear OS companion app
- [ ] Community features
