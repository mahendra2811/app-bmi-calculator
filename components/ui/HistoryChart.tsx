import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';
import AnimatedCard from './AnimatedCard';

interface HistoryChartProps {
  data: { date: string; bmi: number }[];
}

export default function HistoryChart({ data }: HistoryChartProps) {
  if (data.length < 2) return null;

  const recent = data.slice(0, 7).reverse();
  const { width: screenWidth } = useWindowDimensions();
  const chartWidth = screenWidth - 88;
  const chartHeight = 180;
  const paddingTop = 20;
  const paddingBottom = 30;
  const paddingLeft = 36;
  const paddingRight = 16;

  const values = recent.map((d) => d.bmi);
  const minVal = Math.floor(Math.min(...values) - 1);
  const maxVal = Math.ceil(Math.max(...values) + 1);
  const range = maxVal - minVal || 1;

  const graphWidth = chartWidth - paddingLeft - paddingRight;
  const graphHeight = chartHeight - paddingTop - paddingBottom;

  const points = recent.map((d, i) => ({
    x: paddingLeft + (i / (recent.length - 1)) * graphWidth,
    y: paddingTop + graphHeight - ((d.bmi - minVal) / range) * graphHeight,
    label: (() => {
      const date = new Date(d.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    })(),
    value: d.bmi,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Y-axis labels (4 steps)
  const ySteps = 4;
  const yLabels = Array.from({ length: ySteps + 1 }, (_, i) => {
    const val = minVal + (range / ySteps) * i;
    return { val: val.toFixed(1), y: paddingTop + graphHeight - (i / ySteps) * graphHeight };
  });

  return (
    <AnimatedCard className="mb-4 p-3">
      <Text className="text-white font-bold text-base mb-3">BMI Trend</Text>
      <Svg width={chartWidth} height={chartHeight}>
        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <React.Fragment key={i}>
            <Line
              x1={paddingLeft}
              y1={label.y}
              x2={chartWidth - paddingRight}
              y2={label.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <SvgText
              x={paddingLeft - 6}
              y={label.y + 4}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              textAnchor="end"
            >
              {label.val}
            </SvgText>
          </React.Fragment>
        ))}

        {/* Line */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke="#667EEA"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <React.Fragment key={i}>
            <Circle cx={p.x} cy={p.y} r="5" fill="#1E1E3F" stroke="#667EEA" strokeWidth="2.5" />
            {/* X-axis labels */}
            <SvgText
              x={p.x}
              y={chartHeight - 6}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              textAnchor="middle"
            >
              {p.label}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </AnimatedCard>
  );
}
