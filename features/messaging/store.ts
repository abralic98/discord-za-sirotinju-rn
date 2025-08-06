import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Inbox, Room, Server } from "@/generated/graphql";

interface InboxStore {
  activeInbox: Inbox | null | undefined;
  setActiveInbox: (activeInbox: Inbox | null | undefined) => void;
}

export const useInboxStore = create<InboxStore>()(
  devtools(
    (set) => ({
      activeInbox: null,
      setActiveInbox: (activeInbox) => {
        set({ activeInbox }, false, "setActiveInbox");
      },
    }),
    { name: "InboxStore" },
  ),
);
