import { Server, User } from "@/generated/graphql";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { SingleUser } from "./SingleUser";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { TextLg } from "@/lib/typography";

export const UserList = ({ server }: { server?: Server | null }) => {
  const users: User[] = [
    {
      username: "kita",
      id: "1",
    },
    {
      username: "kita2",
      id: "2",
    },
    {
      username: "kita3",
      id: "3",
    },
    {
      username: "kita4",
      id: "4",
    },
    {
      username: "kita5",
      id: "5",
    },
    {
      username: "kita6",
      id: "6",
    },
    {
      username: "kita7",
      id: "7",
    },
    {
      username: "kita5",
      id: "8",
    },
    {
      username: "kita6",
      id: "9",
    },
    {
      username: "kita7",
      id: "17",
    },
  ];
  return (
    <DefaultCard>
      <TextLg>Server users</TextLg>
      <View className="w-full h-80">
        <FlashList
          data={users}
          estimatedItemSize={60}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <SingleUser user={item} />}
        />
      </View>
    </DefaultCard>
  );
};
