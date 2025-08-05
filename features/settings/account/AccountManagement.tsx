import { DefaultCard } from "@/components/custom/DefaultCard";
import { Button } from "@/components/ui/Button";
import { TextLabel, TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";
import { DisableAccount } from "./DisableAccount";

export const AccountManagement = () => {
  return (
    <DefaultCard>
      <TextLabel>Account Management</TextLabel>
      <View className="flex flex-row justify-between ">
        <DisableAccount />
        <Button variant={"destructive2"}>
          <TextMd className="font-semibold">Delete Account</TextMd>
        </Button>
      </View>
    </DefaultCard>
  );
};
