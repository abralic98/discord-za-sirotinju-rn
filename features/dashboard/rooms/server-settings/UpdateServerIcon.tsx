import { DefaultCard } from "@/components/custom/DefaultCard";
import { Server, UpdateServerInput } from "@/generated/graphql";
import { TextLg, TextXl3 } from "@/lib/typography";
import { Image } from "expo-image";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";

export const UpdateServerIcon = ({ server }: { server?: Server | null }) => {
  const form = useForm<UpdateServerInput>();
  const renderIcon = () => {
    if (server?.serverImg) {
      return (
        <Image
          alt="server icon"
          source={{ uri: server?.serverImg }}
          style={{ width: 144, height: 144, borderRadius: 9999 }}
          contentFit="cover"
        />
      );
    } else {
      return (
        <View className="w-36 h-36 rounded-full bg-dark-active-server items-center justify-center">
          <TextXl3 className="font-semibold">
            {server?.name?.slice(0, 2)}
          </TextXl3>
        </View>
      );
    }
  };
  return (
    <DefaultCard>
      <TextLg>Server icon</TextLg>
      <FormProvider {...form}>{renderIcon()}</FormProvider>
    </DefaultCard>
  );
};
