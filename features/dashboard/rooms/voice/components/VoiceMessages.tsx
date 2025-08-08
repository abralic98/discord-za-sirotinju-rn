import routes from "@/lib/routes";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Pressable } from "react-native";
import { useRoomStore } from "../../store";
import { ExpandIcon, MessageCircleIcon } from "lucide-nativewind";
import { VoiceRoomProps } from "../types";

export const VoiceMessages = ({
  handleMinimizePortal,
  showMinimizedPortal,
  setShowMinimizedPortal,
  setShowPortal,
}: VoiceRoomProps) => {
  const { push } = useRouter();
  const { activeRoom } = useRoomStore();
  const pathname = usePathname();
  if (showMinimizedPortal) {
    return (
      <Pressable
        onPress={() => {
          setShowMinimizedPortal(false);
          setShowPortal(true);
        }}
        className={
          "w-20 h-20 rounded-full items-center justify-center bg-dark-server-sidebar"
        }
      >
        <ExpandIcon className={"w-8 h-8 text-white"} />
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => {
        if (!pathname.includes(String(activeRoom?.id))) {
          push(`${routes.room}/${activeRoom?.id}`);
        }
        handleMinimizePortal();
      }}
      className={
        "w-20 h-20 rounded-full items-center justify-center bg-dark-server-sidebar"
      }
    >
      <MessageCircleIcon className={"w-8 h-8 text-white"} />
    </Pressable>
  );
};
