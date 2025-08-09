import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, ScrollView, View } from "react-native";
import { VoiceController } from "./components/VoiceController";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoomUser, VoiceRoomProps } from "./types";
import { useRoomStore } from "../store";
import { SingleRoomUser } from "./components/SingleRoomUser";

export const VoiceOverlay = ({ ...props }: VoiceRoomProps) => {
  const { width, height } = Dimensions.get("window");
  const { roomUsers, activeRoom } = useRoomStore();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const roomId = String(activeRoom?.id);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  console.log(roomUsers, "roomusers");
  return (
    <SafeAreaView className="bg-dark-server-sidebar h-screen">
      <Animated.View
        className={
          "flex-1 bg-dark-server-sidebar items-center justify-between w-screen h-full "
        }
        style={{
          opacity: fadeAnim,
        }}
      >
        <ScrollView>
          <View className="flex-row flex-wrap w-full p-4 gap-4 bg-dark-server-sidebar h-[70vh]">
            {roomUsers[roomId]?.map((user, i) => {
              return (
                <SingleRoomUser key={i} user={user as unknown as RoomUser} />
              );
            })}
          </View>
        </ScrollView>
        <VoiceController {...props} />
      </Animated.View>
    </SafeAreaView>
  );
};
