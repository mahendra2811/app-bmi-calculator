import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from '../context/ThemeContext';
import { SettingsProvider } from '../context/SettingsContext';
import SplashLoader from '../components/ui/SplashLoader';
import '../global.css';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Hide the native splash screen immediately so our custom one takes over
    SplashScreen.hideAsync();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <SettingsProvider>
            <View style={{ flex: 1 }}>
              <Stack
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: '#0F0C29' },
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
                <Stack.Screen name="result" />
                <Stack.Screen name="privacy-policy" />
                <Stack.Screen name="terms-conditions" />
                <Stack.Screen name="disclaimer" />
                <Stack.Screen name="how-it-works" />
                <Stack.Screen name="bmi-chart" />
                <Stack.Screen name="faq" />
                <Stack.Screen name="contact" />
                <Stack.Screen name="about" />
                <Stack.Screen name="licenses" />
              </Stack>

              {showSplash && <SplashLoader onFinish={handleSplashFinish} />}
            </View>
          </SettingsProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
