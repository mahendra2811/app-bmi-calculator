# Code Conventions — BMI Calculator

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Screens (app/) | kebab-case.tsx | `privacy-policy.tsx`, `how-it-works.tsx` |
| Components | PascalCase.tsx | `GradientButton.tsx`, `BMIGauge.tsx` |
| Hooks | camelCase, `use` prefix | `useBMI.ts`, `useHistory.ts` |
| Utils | camelCase.ts | `bmiCalculator.ts`, `healthTips.ts` |
| Contexts | PascalCase + `Context` suffix | `SettingsContext.tsx` |
| Types | PascalCase interfaces in `types/index.ts` | `BMIResult`, `HistoryEntry` |

## Exports

- **Components & Screens:** `export default function ComponentName()`
- **Hooks:** `export function useHookName()`
- **Contexts:** `export const ContextName = createContext<...>()`
- **Utils:** Named exports (`export function calculateBMI()`)

## Styling

**All styling via NativeWind `className` prop.** No StyleSheet.create().

```tsx
// CORRECT
<View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl p-4">
<Text className="text-white text-2xl font-bold">

// WRONG — don't use StyleSheet
const styles = StyleSheet.create({ container: { ... } });
```

### Glass-Morphism Card Pattern (used everywhere)
```tsx
className="bg-white/[0.08] border border-white/[0.12] rounded-3xl"
```

### Dynamic Styles
For values NativeWind can't handle (computed values, animation styles), use inline `style={{}}`:
```tsx
<Animated.View style={[animatedStyle, { width: 50 }]} />
<View style={{ backgroundColor: cat.color }} className="rounded-full px-2 py-1" />
```

### Colors — Always Use Tailwind Tokens
```
text-white, text-white/50, text-white/70     // Text colors
bg-primary-500, bg-primary-500/20            // Primary purple
bg-accent-500, bg-accent-500/20              // Accent pink
text-red-400, bg-red-500/20                  // Danger/delete
bg-white/[0.08], border-white/[0.12]        // Glass cards
```

## Screen Template

Every new screen MUST follow this structure:

```tsx
import React from 'react';
import { View, Text } from 'react-native';
import GradientBackground from '../components/layout/GradientBackground';
import SafeContainer from '../components/layout/SafeContainer';
import PageHeader from '../components/layout/PageHeader';
import FadeIn from '../components/animations/FadeIn';

export default function NewScreen() {
  return (
    <GradientBackground>
      <SafeContainer>
        <PageHeader title="Screen Title" />
        <FadeIn>
          {/* Content here */}
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
```

**Don't forget:**
- Register the screen in `app/_layout.tsx` as a `<Stack.Screen>`
- If linking from Settings, add a `<SettingsRow>` in `app/(tabs)/settings.tsx`

## Animation Pattern

- Wrap sections in `<FadeIn>`, `<SlideUp>`, or `<StaggerList>` for entrance animations
- All animation wrappers respect `useReducedMotion()` for accessibility
- Use `<ScalePress>` for interactive pressable elements
- Stagger delays: typically 50-100ms between items

```tsx
<StaggerList staggerDelay={100}>
  {items.map((item) => (
    <AnimatedCard key={item.id} className="mb-3">
      {/* content */}
    </AnimatedCard>
  ))}
</StaggerList>
```

## Data Access Rules

1. **Always use hooks** to access data — never import contexts directly in screens
   ```tsx
   // CORRECT
   const { settings } = useSettings();
   const { isDark } = useTheme();
   const { history, addEntry } = useHistory();

   // WRONG
   const ctx = useContext(SettingsContext);
   ```

2. **Storage operations** go through `utils/storage.ts`
   ```tsx
   import { storeData, getData } from '../utils/storage';
   ```

3. **Storage keys** are centralized in `utils/constants.ts > STORAGE_KEYS`

## Navigation

- Use `useRouter()` from `expo-router` for programmatic navigation
- Use `useLocalSearchParams<{...}>()` to read route params (typed)
- Pass data as string params only; parse in receiving screen
- Back navigation: `router.back()` or PageHeader's built-in back button

## Platform Checks

Always check `Platform.OS` before using platform-specific APIs:

```tsx
import { Platform } from 'react-native';

// Haptics (not available on web)
if (Platform.OS !== 'web') {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
}

// Share (different API on web)
if (Platform.OS === 'web') {
  await navigator.clipboard.writeText(text);
} else {
  await Share.share({ message: text });
}

// NEVER use Alert.alert() on web — use inline UI instead
```

## Do's

- DO add `FadeIn`/`StaggerList` animations to new screens
- DO use `GradientBackground` + `SafeContainer` on every screen
- DO add haptic feedback on button presses (with Platform.OS check)
- DO use `AnimatedCard` for list items
- DO add loading states for async operations
- DO persist user preferences to AsyncStorage via hooks
- DO use existing color tokens from `tailwind.config.js`
- DO use `useCallback` for event handlers passed as props
- DO use `useMemo` for expensive computations

## Don'ts

- DON'T use `Alert.alert()` on web — it silently fails. Use inline confirmation UI.
- DON'T use `Share.share()` on web without Platform check — it crashes.
- DON'T use inline hex colors — use Tailwind classes (`text-primary-500`, not `color: '#667EEA'`)
- DON'T use `StyleSheet.create()` — use NativeWind `className` instead
- DON'T install Redux/Zustand/MobX — Context API is sufficient
- DON'T use class components — only functional components
- DON'T add `reanimated/plugin` anywhere except as the LAST babel plugin
- DON'T change `AsyncStorage` keys without migration logic
- DON'T forget empty states (use `<EmptyState>` component)
- DON'T write platform-specific code without `Platform.OS` checks
