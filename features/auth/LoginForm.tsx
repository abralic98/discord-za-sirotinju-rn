import { FormInput } from "@/components/input/FormInput";
import { TextSm } from "@/lib/typography";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, View } from "react-native";

export const LoginForm = () => {
  const form = useForm();
  return (
    <View className="w-full">
      <FormProvider {...form}>
        <FormInput className="bg-red-500" label="kita" name="kita" />
      </FormProvider>
    </View>
  );
};
