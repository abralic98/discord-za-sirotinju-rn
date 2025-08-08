import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Room, Server } from "@/generated/graphql";

interface RoomStore {
  activeServer: Server | null | undefined;
  setActiveServer: (activeServer: Server | null | undefined) => void;
  rooms: Room[] | null;
  setRooms: (rooms: Room[] | null) => void;
  activeRoom: Room | null | undefined;
  setActiveRoom: (activeRoom: Room | null | undefined) => void;
  roomUsers: Record<string, string[]>;
  setUsersInRoom: (roomId: string, userIds: string[]) => void;
}

export const useRoomStore = create<RoomStore>()(
  devtools(
    (set) => ({
      activeServer: null,
      setActiveServer: (activeServer) => {
        set({ activeServer }, false, "setActiveServer");
      },
      rooms: null,
      setRooms: (rooms) => {
        set({ rooms }, false, "setRoomStore");
      },
      activeRoom: null,
      setActiveRoom: (activeRoom) => {
        set({ activeRoom }, false, "setActiveRoomStore");
      },
      roomUsers: {},
      setUsersInRoom: (roomId, userIds) =>
        set(
          (state) => ({
            roomUsers: {
              ...state.roomUsers,
              [roomId]: userIds,
            },
          }),
          false,
          "setUsersInRoom",
        ),
    }),
    { name: "RoomStore" },
  ),
);

import { User } from "@/generated/graphql";

interface VoiceRoomStore {
  isUserInVoiceRoom: boolean;
  setIsUserInVoiceRoom: (value: boolean) => void;
  usersInRoom: Record<string, User[]>;
  setUsersInRoom: (roomId: string, users: User[]) => void;
  addUserToRoom: (roomId: string, user: User) => void;
  removeUserFromRoom: (roomId: string, userId: string) => void;
}

export const useVoiceRoomStore = create<VoiceRoomStore>()(
  devtools(
    (set) => ({
      isUserInVoiceRoom: false,
      setIsUserInVoiceRoom: (value) =>
        set({ isUserInVoiceRoom: value }, false, "setIsUserInVoiceRoom"),

      usersInRoom: {},
      setUsersInRoom: (roomId, users) =>
        set(
          (state) => ({
            usersInRoom: { ...state.usersInRoom, [roomId]: users },
          }),
          false,
          "setUsersInRoom",
        ),
      addUserToRoom: (roomId, user) =>
        set(
          (state) => ({
            usersInRoom: {
              ...state.usersInRoom,
              [roomId]: [...(state.usersInRoom[roomId] || []), user],
            },
          }),
          false,
          "addUserToRoom",
        ),
      removeUserFromRoom: (roomId, userId) =>
        set(
          (state) => ({
            usersInRoom: {
              ...state.usersInRoom,
              [roomId]: (state.usersInRoom[roomId] || []).filter(
                (u) => u.id !== userId,
              ),
            },
          }),
          false,
          "removeUserFromRoom",
        ),
    }),
    { name: "VoiceRoomStore" },
  ),
);
