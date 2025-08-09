import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { TextLg } from "@/lib/typography";
import { Room, SocketUserDto, User } from "@/generated/graphql";
import { Portal } from "@gorhom/portal";
import { useVoiceRoom } from "../hooks/useVoiceRoom";
import { VoiceOverlay } from "./VoiceOverlay";
import { useRoomStore } from "../store";
import { MinimizedVoiceController } from "./components/MinimizedController";
import { UserAvatar } from "@/components/UserAvatar";

interface SingleVoiceRoomProps {
  room: Room | null;
}

export const SingleVoiceRoom: React.FC<SingleVoiceRoomProps> = ({ room }) => {
  const { setActiveRoom, roomUsers } = useRoomStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const roomId = room?.id || "";
  const { joinRoom, leaveRoom, userInVoiceRoom } = useVoiceRoom(
    String(room?.server?.id),
  );
  const [showPortal, setShowPortal] = useState(false);
  const [showMinimizedPortal, setShowMinimizedPortal] = useState(false);

  if (!room) return null;

  const handleJoinRoom = async () => {
    if (!roomId) return;
    setIsConnecting(true);

    try {
      joinRoom(roomId);
      setActiveRoom(room);
      setShowPortal(true);
    } catch (e) {
      console.error("Failed to join room", e);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    setShowPortal(false);
    setShowMinimizedPortal(false);
  };

  const handleMinimize = () => {
    setShowPortal(false);
    setShowMinimizedPortal(true);
  };

  const getCurrentRoomUsers = () => {
    return (
      roomUsers[roomId]?.map((user) => (
        <UserAvatar key={user?.id} user={user as unknown as User} />
      )) ?? []
    );
  };

  return (
    <>
      <Pressable
        onPress={userInVoiceRoom ? handleLeaveRoom : handleJoinRoom}
        disabled={isConnecting}
        className="w-full h-16 bg-gray-800 flex flex-row items-center justify-start gap-4 p-4 rounded-lg"
      >
        <TextLg
          numberOfLines={1}
          ellipsizeMode="tail"
          className="font-semibold flex-1"
        >
          {room.name}
        </TextLg>
        <TextLg className="text-gray-400">
          {isConnecting ? "Connecting..." : userInVoiceRoom ? "Leave" : "Join"}
        </TextLg>
      </Pressable>
      <View className="bg-red-500 w-full">{getCurrentRoomUsers()}</View>
      {showPortal && (
        <Portal hostName="VoiceRoom">
          <VoiceOverlay
            showPortal={showPortal}
            setShowPortal={setShowPortal}
            showMinimizedPortal={showMinimizedPortal}
            setShowMinimizedPortal={setShowMinimizedPortal}
            handleMinimizePortal={handleMinimize}
            handleLeaveVoice={handleLeaveRoom}
          />
        </Portal>
      )}
      {showMinimizedPortal && (
        <Portal hostName="VoiceController">
          <View className="h-54 w-54 border-2 border-gray-500 rounded-3xl">
            <MinimizedVoiceController
              showPortal={showPortal}
              setShowPortal={setShowPortal}
              showMinimizedPortal={showMinimizedPortal}
              setShowMinimizedPortal={setShowMinimizedPortal}
              handleMinimizePortal={handleMinimize}
              handleLeaveVoice={handleLeaveRoom}
            />
          </View>
        </Portal>
      )}
    </>
  );
};
