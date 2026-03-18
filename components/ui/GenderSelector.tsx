import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import ScalePress from "../animations/ScalePress";

interface GenderSelectorProps {
  value: "male" | "female";
  onChange: (gender: "male" | "female") => void;
}

export default function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View style={isTablet ? { alignSelf: 'center', width: 400 } : undefined} className="flex-row gap-4 w-full">
      <ScalePress onPress={() => onChange("male")} className="flex-1">
        <View
          className={`items-center py-6 rounded-3xl border ${
            value === "male"
              ? "bg-primary-500/20 border-primary-400"
              : "bg-white/[0.08] border-white/[0.12] opacity-50"
          }`}
        >
          <Text className="text-4xl mb-2">♂️</Text>
          <Text className="text-white font-bold text-base">Male</Text>
        </View>
      </ScalePress>
      <ScalePress onPress={() => onChange("female")} className="flex-1">
        <View
          className={`items-center py-6 rounded-3xl border ${
            value === "female"
              ? "bg-accent-500/20 border-accent-400"
              : "bg-white/[0.08] border-white/[0.12] opacity-50"
          }`}
        >
          <Text className="text-4xl mb-2">♀️</Text>
          <Text className="text-white font-bold text-base">Female</Text>
        </View>
      </ScalePress>
    </View>
  );
}
