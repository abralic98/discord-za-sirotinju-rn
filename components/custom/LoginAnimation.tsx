// ParticleBackground.tsx
import React, { useEffect } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const NUM_PARTICLES = 15;

const COLORS = [
  "#cc3f3d",
  "#60A5FA",
  "#212122",
  "#334155",
  "#1c1f25",
  "#647CD1",
];

function getRandomCoord(max: number) {
  return Math.random() * max;
}

function getRandomDuration() {
  return 4000 + Math.random() * 3000; // 4s–7s
}

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function getRandomSize() {
  return 10 + Math.random() * 20; // 10–30
}

const Particle = () => {
  const size = getRandomSize();
  const color = getRandomColor();

  const x = useSharedValue(getRandomCoord(width));
  const y = useSharedValue(getRandomCoord(height));

  useEffect(() => {
    const animate = () => {
      x.value = withRepeat(
        withTiming(getRandomCoord(width), {
          duration: getRandomDuration(),
          easing: Easing.linear,
        }),
        -1,
        true,
      );

      y.value = withRepeat(
        withTiming(getRandomCoord(height), {
          duration: getRandomDuration(),
          easing: Easing.linear,
        }),
        -1,
        true,
      );
    };

    animate();
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }],
  }));

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};

export const LoginAnimation = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {Array.from({ length: NUM_PARTICLES }).map((_, idx) => (
        <Particle key={idx} />
      ))}
    </View>
  );
};

