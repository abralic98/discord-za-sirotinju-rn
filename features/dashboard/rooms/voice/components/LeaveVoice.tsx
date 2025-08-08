import { PhoneCallIcon } from "lucide-nativewind";
import React from "react";
import { Pressable } from "react-native";

export const LeaveVoice = ({
  handleLeaveVoice,
}: {
  handleLeaveVoice: () => void;
}) => {
  return (
    <Pressable
      onPress={handleLeaveVoice}
      className={
        "w-20 h-20 rounded-full items-center justify-center bg-dark-error2"
      }
    >
      <PhoneCallIcon className={"w-8 h-8 text-white"} />
    </Pressable>
  );
};
