import React, { ReactNode } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: ReactNode;
  colors?: string[];
}

export default function GradientBackground({
  children,
  colors = ['#0F0C29', '#302B63', '#24243E'],
}: GradientBackgroundProps) {
  return (
    <LinearGradient colors={colors} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
}
