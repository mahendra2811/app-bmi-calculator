import React, { useState } from 'react';
import { View, Text, Share, TextInput, Platform, Linking, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import GradientBackground from '../../components/layout/GradientBackground';
import SafeContainer from '../../components/layout/SafeContainer';
import ToggleSwitch from '../../components/ui/ToggleSwitch';
import SettingsRow from '../../components/ui/SettingsRow';
import FadeIn from '../../components/animations/FadeIn';
import { useSettings } from '../../hooks/useSettings';
import { useTheme } from '../../hooks/useTheme';
import { useHistory } from '../../hooks/useHistory';

function InlineConfirm({
  emoji,
  label,
  confirmLabel,
  danger,
  onConfirm,
}: {
  emoji: string;
  label: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <View className="flex-row items-center justify-between py-4 border-b border-white/10">
        <Text className="text-white/60 text-sm">Are you sure?</Text>
        <View className="flex-row gap-3">
          <Pressable onPress={() => setConfirming(false)}>
            <Text className="text-white/50 text-sm">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => { onConfirm(); setConfirming(false); }}
            className="bg-red-500/20 rounded-lg px-3 py-1"
          >
            <Text className="text-red-400 text-sm font-bold">{confirmLabel}</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SettingsRow
      emoji={emoji}
      label={label}
      danger={danger}
      onPress={() => setConfirming(true)}
    />
  );
}

async function shareText(text: string, title?: string) {
  try {
    if (Platform.OS === 'web') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ text, title });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      }
    } else {
      await Share.share({ message: text, title });
    }
  } catch {
    // User cancelled
  }
}

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings, resetSettings } = useSettings();
  const { isDark, toggleTheme } = useTheme();
  const { history, clearHistory } = useHistory();
  const [exportDone, setExportDone] = useState(false);

  const lastBmi = history.length > 0 ? history[0] : null;

  const exportHistory = async () => {
    if (history.length === 0) return;
    const csv = 'Date,BMI,Category,Weight,Height,Age,Gender\n' +
      history.map((h) => `${h.date},${h.bmi},${h.category},${h.weight},${h.height},${h.age},${h.gender}`).join('\n');
    await shareText(csv, 'BMI History Export');
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2000);
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
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl mb-6 px-3">
            <SettingsRow
              emoji="📤"
              label={exportDone ? 'Exported!' : (history.length === 0 ? 'No History to Export' : 'Export History')}
              showChevron={history.length > 0 && !exportDone}
              onPress={exportHistory}
            />
            <InlineConfirm
              emoji="🗑️"
              label="Clear All History"
              confirmLabel="Clear"
              danger
              onConfirm={clearHistory}
            />
            <InlineConfirm
              emoji="🔄"
              label="Reset Settings"
              confirmLabel="Reset"
              onConfirm={resetSettings}
            />
          </View>
        </FadeIn>

        <FadeIn delay={400}>
          <Text className="text-white/50 text-xs uppercase tracking-wider mb-3">Legal & Info</Text>
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl mb-6 px-3">
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
          <View className="bg-white/[0.08] border border-white/[0.12] rounded-3xl mb-6 px-3">
            <SettingsRow
              emoji="⭐"
              label="Rate this App"
              showChevron
              onPress={() => Linking.openURL('https://play.google.com/store')}
            />
            <SettingsRow
              emoji="📤"
              label="Share App"
              showChevron
              onPress={() => shareText('Check out BMI Calculator — track your health journey!', 'BMI Calculator')}
            />
          </View>
          <View className="items-center mb-8">
            <Text className="text-white/30 text-xs mt-4">v1.0.0</Text>
            <Text className="text-white/30 text-xs mt-1">Made with ❤️ by Mahendra</Text>
          </View>
        </FadeIn>
      </SafeContainer>
    </GradientBackground>
  );
}
