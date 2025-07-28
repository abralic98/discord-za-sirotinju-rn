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
    }),
    { name: "RoomStore" },
  ),
);
