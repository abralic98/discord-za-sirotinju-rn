import { cn } from "@/lib/utils";
import { useAudioPlayer } from "expo-audio";
import { MicIcon, MicOffIcon } from "lucide-nativewind";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

const muteAudioSource = require("@/assets/sound/mute.mp3");
const unmuteAudioSource = require("@/assets/sound/unmute.mp3");

export const MuteMicrophone = () => {
  const muteAudio = useAudioPlayer(muteAudioSource);
  const unmuteAudio = useAudioPlayer(unmuteAudioSource);
  const [muted, setMuted] = useState(false);
  return (
    <Pressable
      onPress={() => {
        if (muted) {
          unmuteAudio.seekTo(0);
          unmuteAudio.play();
        } else {
          muteAudio.seekTo(0);
          muteAudio.play();
        }
        setMuted(!muted);
      }}
      className={cn(
        "w-20 h-20 rounded-full items-center justify-center",
        muted ? "bg-white" : "bg-dark-server-sidebar",
      )}
    >
      {!muted ? <MicIcon className={"w-8 h-8 text-white"} /> : <MicOffIcon className="w-8 h-8 text-red-500"/>}
    </Pressable>
  );
};
