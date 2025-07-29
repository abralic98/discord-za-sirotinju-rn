import { FormRadioGroup } from "@/components/form/FormRadioGroup";
import React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

export const Filters = () => {
  const form = useForm();
  const options = [
    {
      label: "Message",
      value: "message",
    },
    {
      label: "User",
      value: "user",
    },
  ];
  return (
    <View className="w-full">
      <FormRadioGroup options={options} name="filter" />
    </View>
  );
};
