import React, { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import GradientBackground from "../../components/layout/GradientBackground";
import SafeContainer from "../../components/layout/SafeContainer";
import GenderSelector from "../../components/ui/GenderSelector";
import AgeWheel from "../../components/ui/AgeWheel";
import SliderInput from "../../components/ui/SliderInput";
import GradientButton from "../../components/ui/GradientButton";
// Phase 2: import AdBannerPlaceholder from "../../components/ui/AdBannerPlaceholder";
import FadeIn from "../../components/animations/FadeIn";
import StaggerList from "../../components/animations/StaggerList";
import { useSettings } from "../../hooks/useSettings";
import { cmToFeetInches, feetInchesToCm, kgToLbs, lbsToKg } from "../../utils/bmiCalculator";

export default function CalculatorScreen() {
  const router = useRouter();
  const { settings } = useSettings();

  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(170);
  const [weightKg, setWeightKg] = useState(70);
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">(
    settings.unitSystem === "imperial" ? "ft" : "cm"
  );
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">(
    settings.unitSystem === "imperial" ? "lbs" : "kg"
  );

  const handleCalculate = useCallback(() => {
    router.push({
      pathname: "/result",
      params: {
        gender,
        age: String(age),
        height: String(heightCm),
        weight: String(weightKg),
      },
    });
  }, [gender, age, heightCm, weightKg, router]);

  const heightDisplay =
    heightUnit === "ft"
      ? (() => {
          const { feet, inches } = cmToFeetInches(heightCm);
          return feet * 12 + inches;
        })()
      : heightCm;

  const weightDisplay = weightUnit === "lbs" ? Math.round(kgToLbs(weightKg)) : weightKg;

  return (
    <GradientBackground>
      <SafeContainer>
        <FadeIn>
          <Text className="text-white text-3xl font-bold text-center mt-4">BMI Calculator</Text>
          <Text className="text-white/70 text-center mb-6">Track your health journey</Text>
        </FadeIn>

        <View className="w-full items-center">
          <View className="w-full max-w-md">
            <StaggerList staggerDelay={100}>
              <View className="mb-4">
                <GenderSelector value={gender} onChange={setGender} />
              </View>

              <View className="mb-4">
                <AgeWheel value={age} onChange={setAge} />
              </View>

              <View className="mb-4">
                <SliderInput
                  label="Height"
                  value={heightUnit === "ft" ? heightDisplay : heightCm}
                  min={heightUnit === "ft" ? 20 : 50}
                  max={heightUnit === "ft" ? 107 : 272}
                  step={1}
                  unit={heightUnit === "ft" ? "in" : "cm"}
                  altUnit={heightUnit === "ft" ? "cm" : "ft'in"}
                  showUnitToggle
                  onValueChange={(v) => {
                    if (heightUnit === "ft") {
                      setHeightCm(Math.round(v * 2.54));
                    } else {
                      setHeightCm(v);
                    }
                  }}
                  onUnitToggle={() => setHeightUnit((prev) => (prev === "cm" ? "ft" : "cm"))}
                />
              </View>

              <View className="mb-6">
                <SliderInput
                  label="Weight"
                  value={weightDisplay}
                  min={weightUnit === "lbs" ? 22 : 10}
                  max={weightUnit === "lbs" ? 660 : 300}
                  step={1}
                  unit={weightUnit}
                  altUnit={weightUnit === "lbs" ? "kg" : "lbs"}
                  showUnitToggle
                  onValueChange={(v) => {
                    if (weightUnit === "lbs") {
                      setWeightKg(Math.round(lbsToKg(v)));
                    } else {
                      setWeightKg(v);
                    }
                  }}
                  onUnitToggle={() => setWeightUnit((prev) => (prev === "kg" ? "lbs" : "kg"))}
                />
              </View>

              <GradientButton title="Calculate BMI →" onPress={handleCalculate} />

              {/* Phase 2: <AdBannerPlaceholder /> */}
            </StaggerList>
          </View>
        </View>
      </SafeContainer>
    </GradientBackground>
  );
}
