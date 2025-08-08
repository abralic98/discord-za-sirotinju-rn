import { Dispatch, SetStateAction } from "react";

export interface VoiceRoomProps {
  showPortal: boolean;
  setShowPortal: Dispatch<SetStateAction<boolean>>;
  showMinimizedPortal: boolean;
  setShowMinimizedPortal: Dispatch<SetStateAction<boolean>>;
  handleLeaveVoice: () => void;
  handleMinimizePortal: () => void;
}
export type RoomUser = {
  id: string;
  username: string;
  avatar: string;
};

