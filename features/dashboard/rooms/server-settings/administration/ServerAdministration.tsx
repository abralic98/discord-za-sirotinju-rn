import { DefaultCard } from "@/components/custom/DefaultCard";
import { TextLg } from "@/lib/typography";
import React from "react";
import { DeleteServer } from "./components/DeleteServer";
import { Server } from "@/generated/graphql";
import { CreateInvitationLink } from "./components/CreateInvite";
import { View } from "react-native";

export const ServerAdministration = ({ server }: { server: Server | null }) => {
  return (
    <DefaultCard>
      <TextLg>Administration</TextLg>
      <View className="flex-row justify-between gap-4">
        <DeleteServer server={server} />
        <CreateInvitationLink server={server} />
      </View>
    </DefaultCard>
  );
};
