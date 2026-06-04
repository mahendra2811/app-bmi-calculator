# Monetization Strategy — BMI Calculator

> **Goal:** Generate revenue through multiple streams — AdMob (primary), premium tier (secondary), IAP (tertiary).

---

## Revenue Stream 1: Google AdMob (Primary — Phase 2)

### Banner Ads
- **Placement:** Bottom of Calculator screen + Result screen
- **Component:** Replace `components/ui/AdBannerPlaceholder.tsx` with real `BannerAd`
- **Size:** Adaptive banner (auto-sizes to screen width)
- **Screens to show on:** Calculator tab, Result screen, History tab (below chart)

### Interstitial Ads
- **Trigger:** After every 3rd BMI calculation
- **Hook:** `hooks/useAds.ts` already has `incrementCalculationCount` and `showInterstitial` stubs
- **Rules:**
  - Never show on first calculation
  - Max 1 interstitial per 3 minutes
  - Don't show during onboarding
  - Always preload the next interstitial after showing one

### Implementation Steps
1. `npx expo install react-native-google-mobile-ads`
2. Add to `app.json` plugins:
   ```json
   ["react-native-google-mobile-ads", {
     "androidAppId": "ca-app-pub-xxxxx~yyyyy"
   }]
   ```
3. Create AdMob account at [admob.google.com](https://admob.google.com)
4. Create 2 ad units: Banner + Interstitial
5. Add IDs to `.env`:
   ```
   EXPO_PUBLIC_ADMOB_BANNER_ID=ca-app-pub-xxxxx/yyyyy
   EXPO_PUBLIC_ADMOB_INTERSTITIAL_ID=ca-app-pub-xxxxx/zzzzz
   EXPO_PUBLIC_ADMOB_APP_ID=ca-app-pub-xxxxx~yyyyy
   ```
6. Replace `AdBannerPlaceholder` with real `BannerAd` component
7. Implement interstitial loading/showing in `useAds` hook
8. **Test with Google's test ad IDs first** (mandatory before production)

### Google Test Ad IDs (for development)
```
Banner:        ca-app-pub-3940256099942544/6300978111
Interstitial:  ca-app-pub-3940256099942544/1033173712
```

### Revenue Estimates (Health & Fitness Category)

| Metric | Low Estimate | High Estimate |
|--------|-------------|--------------|
| Banner eCPM | $0.50 | $2.00 |
| Interstitial eCPM | $4.00 | $15.00 |
| **At 1,000 DAU** | | |
| Banner revenue/month | $15 | $60 |
| Interstitial revenue/month | $50 | $200 |
| **Total at 1K DAU** | **$65/month** | **$260/month** |
| **At 10,000 DAU** | **$650/month** | **$2,600/month** |

---

## Revenue Stream 2: Premium / Pro Tier (Phase 5)

### Free Tier (Ad-Supported)
- All current features
- Banner + interstitial ads
- Full BMI history
- All health tips

### Pro Tier — $2.99/month or $19.99/year
- Remove all ads
- PDF report generation (export BMI results as styled PDF)
- Detailed trend analysis with custom date ranges
- Custom health goals with reminders
- Export to CSV/PDF
- Priority support
- Exclusive health tips (10+ pro-only tips)

### Implementation
- Use `react-native-purchases` (RevenueCat) — simplifies iOS + Android IAP
- Gate premium features behind subscription check
- Add "Go Pro" banner in free tier settings
- Add "Pro" badge next to premium features

---

## Revenue Stream 3: One-Time In-App Purchases (Phase 5)

| Product | Price | Description |
|---------|-------|-------------|
| Remove Ads | $3.99 | One-time purchase, removes all ads forever |
| Health Report Pack | $1.99 | Generate detailed PDF health reports |

---

## Key Metrics to Track

| Metric | What It Tells You |
|--------|------------------|
| Ad impressions/day | How many ad views you're getting |
| eCPM by ad unit | Revenue per 1000 impressions |
| ARPDAU | Revenue per daily active user |
| Ad CTR | Click-through rate (higher = more revenue) |
| Retention D1/D7/D30 | User stickiness (affects all revenue) |
| Calculation frequency | How often users calculate (affects interstitial frequency) |

---

## Ad Mediation (Phase 6 — Advanced)

To increase fill rate and eCPM:
- Google AdMob Mediation (built-in)
- Meta Audience Network
- Unity Ads
- AppLovin MAX

Mediation auto-picks the highest-paying ad network for each impression.

---

## Revenue Timeline Estimate

| Month | DAU | Est. Revenue | Phase |
|-------|-----|-------------|-------|
| Month 1 | 100-500 | $5-50 | Launch + organic |
| Month 3 | 500-2K | $30-500 | ASO + social sharing |
| Month 6 | 2K-5K | $130-1,300 | + Premium tier launch |
| Month 12 | 5K-15K | $325-3,900 | + Localization + new features |

> Revenue depends heavily on user acquisition. Focus on ASO (App Store Optimization), social sharing features, and a great user experience to drive organic growth.
