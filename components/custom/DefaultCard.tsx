import React, { PropsWithChildren } from "react";
import { View } from "react-native";

export const DefaultCard = ({ children }: PropsWithChildren) => {
  return (
    <View className="w-full bg-dark-server p-4 rounded-3xl gap-4">
      {children}
    </View>
  );
};
