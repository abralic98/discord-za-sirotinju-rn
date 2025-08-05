import { DefaultCard } from "@/components/custom/DefaultCard";
import { formatDate } from "@/helpers/Date";
import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

export const MemberSince = ({ date }: { date?: string | null }) => {
  return (
    <View>
      <DefaultCard>
        <TextMd className="font-semibold opacity-60">Member Since</TextMd>
        <TextMd>{formatDate(date)}</TextMd>
      </DefaultCard>
    </View>
  );
};
