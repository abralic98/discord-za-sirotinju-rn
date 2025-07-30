import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { Button } from "@/components/ui/Button";
import { TextMd } from "@/lib/typography";
import React from "react";
import { View } from "react-native";

export const UserActions = () => {
  return (
    <View>
      <CustomBottomSheet
        trigger={(open) => (
          <Button onPress={open}>
            <TextMd>Actions</TextMd>
          </Button>
        )}
      >
        <Button>
          <TextMd>kita</TextMd>
        </Button>
      </CustomBottomSheet>
    </View>
  );
};
