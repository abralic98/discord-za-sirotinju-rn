import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Room, Server } from "@/generated/graphql";

interface RoomStore {
  activeServer: Server | null | undefined;
  setActiveServer: (activeServer: Server | null | undefined) => void;
  rooms: Room[] | null;
  setRooms: (rooms: Room[] | null) => void;
}

export const useRoomStore = create<RoomStore>()(
  devtools(
    (set) => ({
      activeServer: null,
      setActiveServer: (activeServer) => {
        set({ activeServer }, false, "setRoomStore");
      },
      rooms: null,
      setRooms: (rooms) => {
        set({ rooms }, false, "setRoomStore");
      },
    }),
    { name: "RoomStore" },
  ),
);
