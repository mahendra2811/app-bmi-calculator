import React from 'react';
import { View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AnimatedCard from './AnimatedCard';

interface HistoryChartProps {
  data: { date: string; bmi: number }[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  if (data.length < 2) return null;

  const recent = data.slice(0, 7).reverse();
  const screenWidth = Dimensions.get('window').width - 64;

  return (
    <AnimatedCard className="mb-4 p-3">
      <Text className="text-white font-bold text-base mb-3">BMI Trend</Text>
      <LineChart
        data={{
          labels: recent.map((d) => {
            const date = new Date(d.date);
            return `${date.getMonth() + 1}/${date.getDate()}`;
          }),
          datasets: [{ data: recent.map((d) => d.bmi) }],
        }}
        width={screenWidth - 24}
        height={200}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: 'transparent',
          backgroundGradientFrom: '#1E1E3F',
          backgroundGradientTo: '#302B63',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(102, 126, 234, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '4', strokeWidth: '2', stroke: '#667EEA' },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </AnimatedCard>
  );
}
