import React from 'react';
import { View, Text, Alert, Share, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '../../components/layout/GradientBackground';
import SafeContainer from '../../components/layout/SafeContainer';
import ToggleSwitch from '../../components/ui/ToggleSwitch';
import SettingsRow from '../../components/ui/SettingsRow';
import FadeIn from '../../components/animations/FadeIn';
import { useSettings } from '../../hooks/useSettings';
import { useTheme } from '../../hooks/useTheme';
import { useHistory } from '../../hooks/useHistory';

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings, resetSettings } = useSettings();
  const { isDark, toggleTheme } = useTheme();
  const { history, clearHistory } = useHistory();

  const lastBmi = history.length > 0 ? history[0] : null;

  const exportHistory = async () => {
    if (history.length === 0) {
      Alert.alert('No Data', 'No history to export.');
      return;
    }
    const csv = 'Date,BMI,Category,Weight,Height,Age,Gender\n' +
      history.map((h) => `${h.date},${h.bmi},${h.category},${h.weight},${h.height},${h.age},${h.gender}`).join('\n');
    await Share.share({ message: csv, title: 'BMI History Export' });
  };

  return (
    <GradientBackground>
      <SafeContainer>
        <FadeIn>
          <Text className="text-white text-2xl font-bold py-4">Settings</Text>
        </FadeIn>

        <FadeIn delay={100}>
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl p-5 mb-6">
            <View className="items-center mb-3">
              <View className="w-16 h-16 rounded-full bg-primary-500/20 items-center justify-center mb-2">
                <Text className="text-3xl">👤</Text>
              </View>
              <TextInput
                value={settings.name}
                onChangeText={(text) => updateSettings({ name: text })}
                placeholder="Your Name"
                placeholderTextColor="rgba(255,255,255,0.3)"
                className="text-white text-center text-lg"
              />
            </View>
            {lastBmi && (
              <Text className="text-white/50 text-center text-sm">
                Latest BMI: {lastBmi.bmi.toFixed(1)} — {lastBmi.category}
              </Text>
            )}
          </View>
        </FadeIn>

        <FadeIn delay={200}>
          <Text className="text-white/50 text-xs uppercase tracking-wider mb-3">Preferences</Text>
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl p-4 mb-6">
            <View className="mb-4">
              <ToggleSwitch
                label="Imperial Units"
                value={settings.unitSystem === 'imperial'}
                onToggle={(v) => updateSettings({ unitSystem: v ? 'imperial' : 'metric' })}
              />
            </View>
            <View className="mb-4">
              <ToggleSwitch label="Dark Theme" value={isDark} onToggle={toggleTheme} />
            </View>
            <View className="mb-4">
              <ToggleSwitch
                label="Haptic Feedback"
                value={settings.hapticEnabled}
                onToggle={(v) => updateSettings({ hapticEnabled: v })}
              />
            </View>
            <ToggleSwitch
              label="Reminders"
              value={settings.reminderEnabled}
              onToggle={(v) => updateSettings({ reminderEnabled: v })}
            />
          </View>
        </FadeIn>

        <FadeIn delay={300}>
          <Text className="text-white/50 text-xs uppercase tracking-wider mb-3">Data</Text>
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl mb-6">
            <SettingsRow emoji="📤" label="Export History" showChevron onPress={exportHistory} />
            <SettingsRow
              emoji="🗑️"
              label="Clear All History"
              danger
              onPress={() => Alert.alert('Clear History', 'This will delete all your BMI history.', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Clear', style: 'destructive', onPress: clearHistory },
              ])}
            />
            <SettingsRow
              emoji="🔄"
              label="Reset Settings"
              onPress={() => Alert.alert('Reset', 'Restore default settings?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Reset', onPress: resetSettings },
              ])}
            />
          </View>
        </FadeIn>

        <FadeIn delay={400}>
          <Text className="text-white/50 text-xs uppercase tracking-wider mb-3">Legal & Info</Text>
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl mb-6">
            <SettingsRow emoji="🔒" label="Privacy Policy" showChevron onPress={() => router.push('/privacy-policy')} />
            <SettingsRow emoji="📜" label="Terms & Conditions" showChevron onPress={() => router.push('/terms-conditions')} />
            <SettingsRow emoji="⚠️" label="Medical Disclaimer" showChevron onPress={() => router.push('/disclaimer')} />
            <SettingsRow emoji="📐" label="How BMI Works" showChevron onPress={() => router.push('/how-it-works')} />
            <SettingsRow emoji="📊" label="BMI Reference Chart" showChevron onPress={() => router.push('/bmi-chart')} />
            <SettingsRow emoji="❓" label="FAQ" showChevron onPress={() => router.push('/faq')} />
            <SettingsRow emoji="✉️" label="Contact / Feedback" showChevron onPress={() => router.push('/contact')} />
            <SettingsRow emoji="ℹ️" label="About" showChevron onPress={() => router.push('/about')} />
            <SettingsRow emoji="📦" label="Open Source Licenses" showChevron onPress={() => router.push('/licenses')} />
          </View>
        </FadeIn>

        <FadeIn delay={500}>
          <View className="items-center mb-8">
            <SettingsRow emoji="⭐" label="Rate this App" showChevron onPress={() => Alert.alert('Rate', 'This would open the Play Store.')} />
            <SettingsRow emoji="📤" label="Share App" showChevron onPress={() => Share.share({ message: 'Check out BMI Calculator app!' })} />
            <Text className="text-white/30 text-xs mt-4">v1.0.0</Text>
            <Text className="text-white/30 text-xs mt-1">Made with ❤️ by Mahendra</Text>
          </View>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
