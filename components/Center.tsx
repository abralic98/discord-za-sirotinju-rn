import React from "react";
import { View } from "react-native";

type CenterProps = {
  children: React.ReactNode;
  className?: string;
};

const Center = ({ children, className = "" }: CenterProps) => {
  return (
    <View className={`flex-1 justify-center items-center ${className}`}>
      {children}
    </View>
  );
};

export default Center;
