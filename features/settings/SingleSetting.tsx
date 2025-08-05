import routes from "@/lib/routes";
import { TextMd } from "@/lib/typography";
import { RelativePathString, useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable } from "react-native";

export const SingleSetting = ({
  name,
  route,
  icon,
}: {
  name: string;
  route: string;
  icon: ReactNode;
}) => {
  const { push } = useRouter();
  return (
    <Pressable
      className="w-full h-14 bg-dark-active-server flex flex-row gap-4 items-center px-2 rounded-xl"
      onPress={() => push(route as RelativePathString)}
    >
      {icon}
      <TextMd className="font-semibold">{name}</TextMd>
    </Pressable>
  );
};
