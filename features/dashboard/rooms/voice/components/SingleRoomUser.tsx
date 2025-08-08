import React from "react";
import { RoomUser } from "../types";
import { View } from "react-native";
import { TextMd } from "@/lib/typography";
import { UserAvatar } from "@/components/UserAvatar";

import { Dimensions } from "react-native";

const GAP = 16;
const numColumns = 2;
const { width } = Dimensions.get("window");
const itemWidth = (width - GAP * (numColumns + 1)) / numColumns;

export const SingleRoomUser = ({ user }: { user: RoomUser }) => {
  return (
    <View
      style={{ width: itemWidth }}
      className="bg-dark-active-server rounded-3xl items-center aspect-square p-4"
    >
      <UserAvatar className="w-[80%] h-[80%]" user={user} />
      <TextMd className="font-semibold">{user.username}</TextMd>
    </View>
  );
};
