import React, { useRef } from "react";
import { View, Animated, PanResponder } from "react-native";
import { MuteMicrophone } from "./MuteMicrophone";
import { LeaveVoice } from "./LeaveVoice";
import { VoiceMessages } from "./VoiceMessages";
import { VoiceRoomProps } from "../types";
import { cn } from "@/lib/utils";

export const MinimizedVoiceController = ({ ...props }: VoiceRoomProps) => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          //@ts-ignore
          x: pan.x._value,
          //@ts-ignore
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          position: "absolute",
          bottom: 250,
          right: 20,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
    >
      <View
        className={cn(
          "align-bottom flex flex-row items-center justify-around bg-dark-server-sidebar w-52 h-52 flex-wrap p-4 gap-2 rounded-3xl scale-75",
        )}
      >
        <MuteMicrophone />
        <LeaveVoice {...props} />
        <VoiceMessages {...props} />
      </View>
    </Animated.View>
  );
};
