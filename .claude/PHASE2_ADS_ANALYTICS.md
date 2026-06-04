# Phase 2: Ads & Analytics — Changes Log + Setup Guide

## What Was Done (Phase 1 Cleanup)

All AdMob, Firebase Analytics, Google Tag Manager, and Google Analytics code was **commented out** to ship Phase 1 clean. Nothing was deleted — everything is preserved and marked `// Phase 2:` for easy re-enabling.

### Files Changed

| File | What Was Done |
|------|--------------|
| `app/(tabs)/index.tsx` | Commented out `AdBannerPlaceholder` import + `<AdBannerPlaceholder />` usage |
| `app/result.tsx` | Commented out `AdBannerPlaceholder` import + `<AdBannerPlaceholder />` usage |
| `hooks/useAds.ts` | Real implementation wrapped in `/* */`; replaced with no-op stub returning `showBanner: false` |
| `hooks/useAnalytics.ts` | Real implementation wrapped in `/* */`; replaced with no-op stub functions |
| `utils/analytics.ts` | Real implementation wrapped in `/* */`; replaced with no-op exports |
| `utils/legalContent.ts` | Commented out 3 sections: "Third-Party Advertising (Google AdMob)", "Analytics (Firebase Analytics)", "Advertising" (in Terms) |
| `.env` | Prefixed 7 vars with `#`: ADMOB_BANNER_ID, ADMOB_INTERSTITIAL_ID, ADMOB_APP_ID, GTM_CONTAINER_ID, GA_MEASUREMENT_ID, FIREBASE_API_KEY, FIREBASE_PROJECT_ID |
| `.env.sample` | Same as `.env` |

---

## Phase 2 Checklist — Step by Step

### Step 1 — Install Packages

```bash
cd bmi-calculator

# AdMob
npx expo install react-native-google-mobile-ads

# Firebase (core + analytics)
npx expo install @react-native-firebase/app @react-native-firebase/analytics

# Optional: crash reporting
npx expo install @react-native-firebase/crashlytics
```

---

### Step 2 — Create AdMob Account & Ad Units

1. Go to [admob.google.com](https://admob.google.com)
2. Create an app → select Android
3. Create 2 ad units:
   - **Banner** → copy the unit ID (format: `ca-app-pub-XXXXX/YYYYY`)
   - **Interstitial** → copy the unit ID
4. Also copy the **App ID** (format: `ca-app-pub-XXXXX~YYYYY`)

**Test IDs for development (use these before going live):**
```
App ID:        ca-app-pub-3940256099942544~3347511713
Banner:        ca-app-pub-3940256099942544/6300978111
Interstitial:  ca-app-pub-3940256099942544/1033173712
```

---

### Step 3 — Create Firebase Project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → Add Android app
3. Package name: `com.mahendra.bmicalculator`
4. Download `google-services.json` → place it at:
   ```
   bmi-calculator/google-services.json
   ```
5. Copy your API Key and Project ID

---

### Step 4 — Fill in `.env`

Uncomment and fill in the 7 vars (remove the `#` prefix):

```env
EXPO_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-XXXXX/YYYYY
EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-XXXXX/YYYYY
EXPO_PUBLIC_ADMOB_APP_ID=ca-app-pub-XXXXX~YYYYY
EXPO_PUBLIC_GTM_CONTAINER_ID=GTM-XXXXXX
EXPO_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaXXXXXX
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

Same for `.env.sample` (use placeholder values, not real keys).

---

### Step 5 — Update `app.json`

Add the AdMob plugin with your App ID:

```json
"plugins": [
  "expo-router",
  "expo-sharing",
  [
    "react-native-google-mobile-ads",
    {
      "androidAppId": "ca-app-pub-XXXXX~YYYYY"
    }
  ]
]
```

---

### Step 6 — Re-enable AdBannerPlaceholder

In `app/(tabs)/index.tsx` and `app/result.tsx`, uncomment the import and JSX:

```tsx
// Before (commented out):
// Phase 2: import AdBannerPlaceholder from "../../components/ui/AdBannerPlaceholder";
// {/* Phase 2: <AdBannerPlaceholder /> */}

// After (uncommented):
import AdBannerPlaceholder from "../../components/ui/AdBannerPlaceholder";
<AdBannerPlaceholder />
```

Then replace `AdBannerPlaceholder.tsx` with the real AdMob `BannerAd` component:

```tsx
// components/ui/AdBannerPlaceholder.tsx → replace with:
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = process.env.EXPO_PUBLIC_ADMOB_BANNER_ID ?? TestIds.BANNER;

export default function AdBanner() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{ requestNonPersonalizedAdsOnly: true }}
    />
  );
}
```

---

### Step 7 — Re-enable useAds Hook

In `hooks/useAds.ts`, uncomment the original implementation (remove `/* */` wrapper) and delete the no-op stub at the bottom. Then add real interstitial logic:

```ts
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const interstitialUnitId = process.env.EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID ?? TestIds.INTERSTITIAL;
const interstitial = InterstitialAd.createForAdRequest(interstitialUnitId);
```

Show after every 3rd calculation (already tracked via `calculationCount`).

---

### Step 8 — Re-enable Analytics

In `utils/analytics.ts` and `hooks/useAnalytics.ts`, uncomment the original implementations and wire up Firebase:

```ts
import analytics from '@react-native-firebase/analytics';

export async function trackEvent(name: string, params?: Record<string, unknown>) {
  await analytics().logEvent(name, params);
}
```

**Key events to track:**
| Event | When |
|-------|------|
| `bmi_calculated` | User taps "Calculate BMI" |
| `result_saved` | User taps Save on result screen |
| `result_shared` | User taps Share on result screen |
| `history_viewed` | User opens History tab |
| `tip_viewed` | User opens a health tip |
| `settings_changed` | User changes a setting |

---

### Step 9 — Re-enable Legal Sections

In `utils/legalContent.ts`, uncomment the 3 sections (remove `//` prefixes):
- "Third-Party Advertising (Google AdMob)" in Privacy Policy
- "Analytics (Firebase Analytics)" in Privacy Policy
- "Advertising" in Terms & Conditions

---

### Step 10 — Test on Real Device

```bash
# Build dev client (required for native AdMob/Firebase)
npx expo run:android

# Verify:
# - Banner ad appears at bottom of Calculator and Result screens
# - Interstitial shows after 3rd calculation
# - Firebase console shows events within 24h (or use DebugView)
```

---

## Revenue Estimates (from MONETIZATION.md)

| DAU | Monthly Revenue |
|-----|----------------|
| 1,000 | $65 – $260 |
| 10,000 | $650 – $2,600 |
| 50,000 | $3,250 – $13,000 |

---

## Notes

- AdMob requires a **real Android build** (`expo run:android`) — it does NOT work in Expo Go
- Firebase `google-services.json` must never be committed to a public repo — add to `.gitignore`
- Always test with Google test IDs first; switch to real IDs only before Play Store submission
- GTM (`EXPO_PUBLIC_GTM_CONTAINER_ID`) is optional — skip if not using Tag Manager
