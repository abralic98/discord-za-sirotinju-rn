import { Server, User } from "@/generated/graphql";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import { SingleUser } from "./SingleUser";
import { DefaultCard } from "@/components/custom/DefaultCard";
import { TextLg } from "@/lib/typography";

export const UserList = ({ server }: { server?: Server | null }) => {
  //tailwind not workiing for some reason temporary
  const getHeight = () => {
    switch (server?.joinedUsers?.length) {
      case 1:
        return 60;
      case 2:
        return 120;

      case 3:
        return 180;

      case 4:
        return 240;

      case 5:
        return 320;

      default:
        return 380;
    }
  };
  return (
    <DefaultCard>
      <TextLg>Server users ({`${server?.joinedUsers?.length}`})</TextLg>
      <View className="w-full" style={{ height: getHeight() }}>
        <FlashList
          data={server?.joinedUsers}
          estimatedItemSize={60}
          keyExtractor={(item) => String(item?.id)}
          renderItem={({ item }) => <SingleUser user={item} />}
        />
      </View>
    </DefaultCard>
  );
};
