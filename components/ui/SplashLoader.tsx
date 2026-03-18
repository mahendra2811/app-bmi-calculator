import React, { useEffect } from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
  Easing,
  runOnJS,
  useReducedMotion,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface SplashLoaderProps {
  onFinish: () => void;
}

const logo = require('../../assets/images/logo.png');

export default function SplashLoader({ onFinish }: SplashLoaderProps) {
  const { width, height } = useWindowDimensions();
  const reducedMotion = useReducedMotion();

  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(30);

  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);

  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(20);

  const shimmerX = useSharedValue(-1);

  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    if (reducedMotion) {
      logoOpacity.value = 1;
      logoScale.value = 1;
      logoTranslateY.value = 0;
      taglineOpacity.value = 1;
      taglineTranslateY.value = 0;

      const timeout = setTimeout(() => {
        onFinish();
      }, 1500);
      return () => clearTimeout(timeout);
    }

    // Phase 1: Logo fades in and scales up with spring (0 → 800ms)
    logoOpacity.value = withTiming(1, { duration: 600 });
    logoScale.value = withSpring(1, {
      damping: 12,
      stiffness: 100,
      mass: 0.8,
    });
    logoTranslateY.value = withSpring(0, {
      damping: 14,
      stiffness: 90,
    });

    // Phase 2: Ring pulse behind logo (400ms → 1200ms)
    ringScale.value = withDelay(
      400,
      withSequence(
        withTiming(1.3, { duration: 500, easing: Easing.out(Easing.ease) }),
        withTiming(1, { duration: 300, easing: Easing.inOut(Easing.ease) })
      )
    );
    ringOpacity.value = withDelay(
      400,
      withSequence(
        withTiming(0.5, { duration: 300 }),
        withDelay(400, withTiming(0, { duration: 300 }))
      )
    );

    // Phase 3: Tagline slides in (800ms → 1200ms)
    taglineOpacity.value = withDelay(
      800,
      withTiming(1, { duration: 400 })
    );
    taglineTranslateY.value = withDelay(
      800,
      withSpring(0, { damping: 14, stiffness: 90 })
    );

    // Phase 4: Shimmer across logo (1000ms → 1600ms)
    shimmerX.value = withDelay(
      1000,
      withTiming(2, { duration: 600, easing: Easing.inOut(Easing.ease) })
    );

    // Phase 5: Fade out everything (2200ms → 2700ms)
    screenOpacity.value = withDelay(
      2200,
      withTiming(0, { duration: 500, easing: Easing.in(Easing.ease) }, (finished) => {
        if (finished) {
          runOnJS(onFinish)();
        }
      })
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
    ],
  }));

  const ringAnimatedStyle = useAnimatedStyle(() => ({
    opacity: ringOpacity.value,
    transform: [{ scale: ringScale.value }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  const screenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const logoSize = Math.min(width * 0.55, 240);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
        },
        screenAnimatedStyle,
      ]}
    >
      <LinearGradient
        colors={['#0F0C29', '#1A1645', '#302B63', '#1A1645', '#0F0C29']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Glow ring behind logo */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: logoSize * 1.6,
              height: logoSize * 1.6,
              borderRadius: logoSize * 0.8,
              borderWidth: 2,
              borderColor: '#34D399',
            },
            ringAnimatedStyle,
          ]}
        />

        {/* Second glow ring */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: logoSize * 1.9,
              height: logoSize * 1.9,
              borderRadius: logoSize * 0.95,
              borderWidth: 1,
              borderColor: '#667EEA',
            },
            ringAnimatedStyle,
          ]}
        />

        {/* Logo container */}
        <Animated.View
          style={[
            {
              width: logoSize,
              height: logoSize,
              justifyContent: 'center',
              alignItems: 'center',
            },
            logoAnimatedStyle,
          ]}
        >
          <Image
            source={logo}
            style={{
              width: logoSize,
              height: logoSize,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          style={[
            {
              color: 'rgba(255,255,255,0.7)',
              fontSize: 15,
              fontWeight: '500',
              letterSpacing: 2,
              marginTop: 32,
              textTransform: 'uppercase',
            },
            taglineAnimatedStyle,
          ]}
        >
          Your Health, Simplified
        </Animated.Text>

        {/* Loading dots */}
        <Animated.View
          style={[
            {
              flexDirection: 'row',
              marginTop: 40,
              gap: 8,
            },
            taglineAnimatedStyle,
          ]}
        >
          {[0, 1, 2].map((i) => (
            <LoadingDot key={i} index={i} reducedMotion={reducedMotion} />
          ))}
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

function LoadingDot({ index, reducedMotion }: { index: number; reducedMotion: boolean }) {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    if (reducedMotion) {
      opacity.value = 0.8;
      return;
    }

    const startDelay = 1000 + index * 200;

    opacity.value = withDelay(
      startDelay,
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0.3, { duration: 300 }),
        withTiming(1, { duration: 300 }),
        withTiming(0.3, { duration: 300 }),
        withTiming(1, { duration: 300 }),
      )
    );
  }, []);

  const dotStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#34D399',
        },
        dotStyle,
      ]}
    />
  );
}
