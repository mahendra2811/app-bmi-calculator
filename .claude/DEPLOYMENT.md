# Deployment Guide — BMI Calculator

> Step-by-step guide to build, sign, and publish to Google Play Store.

---

## Prerequisites Checklist

- [ ] Google Play Developer Account created ($25 one-time fee at [play.google.com/console](https://play.google.com/console))
- [ ] EAS CLI installed: `npm install -g eas-cli`
- [ ] Logged in: `eas login`
- [ ] All `.env` variables filled with production values
- [ ] Android package name finalized (currently placeholder: `com.yourname.bmicalculator`)
- [ ] AdMob account created and ad unit IDs ready

---

## Step 1: Update App Configuration

### app.json Updates
```json
{
  "expo": {
    "android": {
      "package": "com.mahendra.bmicalculator",  // UPDATE THIS
      "versionCode": 1                           // INCREMENT per release
    },
    "version": "1.0.0",                          // UPDATE per release
    "plugins": [
      "expo-router",
      "expo-sharing",
      ["react-native-google-mobile-ads", {       // ADD THIS
        "androidAppId": "ca-app-pub-xxxxx~yyyyy"
      }]
    ]
  }
}
```

### .env — Fill All Values
```
EXPO_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-xxxxx/yyyyy
EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-xxxxx/zzzzz
EXPO_PUBLIC_ADMOB_APP_ID=ca-app-pub-xxxxx~yyyyy
EXPO_PUBLIC_SUPPORT_EMAIL=your-real-email@gmail.com
```

### Update Rate/Share URLs
After publishing, update these in `app/(tabs)/settings.tsx`:
- "Rate this App" → `https://play.google.com/store/apps/details?id=com.mahendra.bmicalculator`
- "Share App" → Same URL in the share message

---

## Step 2: Build for Production

```bash
# From inside bmi-calculator/ directory

# First time setup
eas build:configure

# Build production AAB for Android
eas build --platform android --profile production

# This will:
# 1. Bundle the app
# 2. Generate a signed AAB (Android App Bundle)
# 3. Upload to EAS servers
# 4. Return a download URL for the AAB
```

### eas.json (Already Configured)
```json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal" },
    "production": { "android": { "buildType": "app-bundle" } }
  }
}
```

---

## Step 3: Create Play Store Listing

### App Details
| Field | Value |
|-------|-------|
| App name | BMI Calculator |
| Short description (80 chars) | Calculate BMI, body fat, BMR & more. Track your health journey. |
| Category | Health & Fitness |
| Content rating | Everyone |
| Target audience | 13+ |

### Full Description (4000 chars max)
Write a keyword-rich description covering:
- What the app does (BMI calculator with 11 health metrics)
- Key features (history tracking, health tips, beautiful UI)
- Privacy (all data stored locally)
- Free to use

### Required Assets

| Asset | Size | Status |
|-------|------|--------|
| App icon | 512x512 px | Exists (`assets/images/icon.png`) |
| Feature graphic | 1024x500 px | NEED TO CREATE |
| Phone screenshots | 1080x1920 or 1080x2400 | NEED TO CREATE (min 2, up to 8) |
| Tablet screenshots (optional) | 1920x1200 | Optional |

**Screenshots to capture:**
1. Calculator screen (main input)
2. Result screen (BMI gauge + stats)
3. History screen (chart + entries)
4. Tips screen (tip of the day)
5. Settings screen

### Data Safety Declaration
| Question | Answer |
|----------|--------|
| Does the app collect data? | Yes (health info for calculations) |
| Is data shared with third parties? | No (except ad SDK device identifiers) |
| Is data encrypted? | Stored locally only (AsyncStorage) |
| Can users request deletion? | Yes (Settings > Clear History) |
| Data types collected | Health info (BMI, weight, height) — stored on device only |

---

## Step 4: Submit to Play Store

### Option A: Automated via EAS Submit
```bash
# Set up Google Cloud service account for automated submission
# 1. Go to Google Cloud Console > APIs > Service Accounts
# 2. Create service account with "Service Account User" role
# 3. Download JSON key as play-store-key.json
# 4. In Play Console > Settings > API access > Link the service account

# Add to eas.json:
# "submit": { "production": { "android": { "serviceAccountKeyPath": "./play-store-key.json" } } }

eas submit --platform android --profile production
```

### Option B: Manual Upload
1. Download AAB from EAS dashboard (after build completes)
2. Go to Google Play Console > Your app > Production
3. Click "Create new release"
4. Upload the AAB file
5. Add release notes
6. Review and submit

> **Important:** First submission goes through Google review (can take 1-7 days).

---

## Step 5: Testing Strategy

1. **Internal testing** (first) — Upload to internal testing track, test on 2-3 devices
2. **Closed testing** — Invite 10-20 testers via email
3. **Open testing** (optional) — Public beta
4. **Production** — Full release

---

## Step 6: Post-Launch Checklist

- [ ] Monitor Android Vitals (crash rate < 1%, ANR rate < 0.5%)
- [ ] Respond to user reviews within 24 hours
- [ ] Track installs and retention in Play Console
- [ ] Monitor ad revenue in AdMob dashboard
- [ ] Plan first update (within 2-4 weeks with bug fixes)
- [ ] Set up Firebase Remote Config for feature flags

---

## .gitignore Reminders

**MUST be in .gitignore (never commit):**
```
play-store-key.json
.env
```

---

## Common Build Issues

| Issue | Fix |
|-------|-----|
| Reanimated build error | Ensure `reanimated/plugin` is LAST in babel.config.js |
| NativeWind not working | Check babel preset order + tailwind.config.js content paths |
| AdMob not loading | Test with test IDs first; check INTERNET permission in app.json |
| Splash screen stuck | `SplashScreen.hideAsync()` is in app/_layout.tsx useEffect |
| Build timeout | EAS builds can take 10-20 min; check EAS dashboard for status |
