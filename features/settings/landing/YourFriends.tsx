import { DefaultCard } from "@/components/custom/DefaultCard";
import { TextMd } from "@/lib/typography";
import { ArrowRightIcon } from "lucide-nativewind";
import React from "react";
import { View } from "react-native";

export const YourFriends = () => {
  return (
    <View>
      <DefaultCard>
        <TextMd className="font-semibold opacity-60">Your friends (20)</TextMd>
        <ArrowRightIcon />
      </DefaultCard>
    </View>
  );
};
