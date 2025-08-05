import React from "react";
import { View } from "react-native";
import { Filters } from "./Filters";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/input/FormInput";
import { MessageList } from "./MessageList";

export const SearchRoom = () => {
  const form = useForm({
    defaultValues: {
      filter: "message",
    },
  });
  return (
    <View>
      <FormProvider {...form}>
        <View className="gap-4">
          <Filters />
          <FormInput placeholder="Start typing..." name="search" />
          <MessageList />
        </View>
      </FormProvider>
    </View>
  );
};
