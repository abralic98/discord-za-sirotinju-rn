import { Animated, StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import EZLogoDark from "@/assets/logo/EZLogoDark";

type Props = {
  onFadeOutComplete?: () => void;
};

export default function CustomSplash({ onFadeOutComplete }: Props) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      delay: 500, // optional delay before fade starts
      useNativeDriver: true,
    }).start(() => {
      onFadeOutComplete?.();
    });
  }, []);

  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, styles.container, { opacity }]}
    >
      <EZLogoDark />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000", // adjust as needed
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
});
