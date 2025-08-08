import React from "react";
import { View } from "react-native";
import { MuteMicrophone } from "./MuteMicrophone";
import { LeaveVoice } from "./LeaveVoice";
import { VoiceMessages } from "./VoiceMessages";
import { VoiceRoomProps } from "../types";

export const VoiceController = ({ ...props }: VoiceRoomProps) => {
  return (
    <View
      className={
        "h-28 align-bottom  flex flex-row items-center justify-around bg-dark-active-server w-full"
      }
    >
      <MuteMicrophone />
      <LeaveVoice {...props} />
      <VoiceMessages {...props} />
    </View>
  );
};
