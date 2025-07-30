import React from "react";
import { View } from "react-native";
import { Button } from "../ui/Button";
import { TextMd } from "@/lib/typography";

interface Props {
  cancel: () => void;
  submit: () => void;
  submitText?: string;
  loading?: boolean;
}
export const ConfirmationButtons = ({
  cancel,
  submit,
  submitText,
  loading,
}: Props) => {
  return (
    <View className="flex-row justify-between w-full">
      <Button onPress={cancel} className="min-w-[35%]" variant={"destructive"}>
        <TextMd className="font-semibold">Cancel</TextMd>
      </Button>
      <Button loading={loading} onPress={submit} className="min-w-[35%]">
        <TextMd className="font-semibold">{submitText ?? "Submit"}</TextMd>
      </Button>
    </View>
  );
};
