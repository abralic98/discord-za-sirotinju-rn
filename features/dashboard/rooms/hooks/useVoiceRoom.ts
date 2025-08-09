import { useAuthStore } from "@/features/auth/store";
import { SocketUserDto } from "@/generated/graphql";
import { voiceUrl } from "@/lib/graphql/client";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  mediaDevices,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  MediaStream,
} from "react-native-webrtc";
import { useRoomStore } from "../store";
import { useAudioPlayer } from "expo-audio";

interface SignalData {
  type:
    | "joinServer"
    | "joinRoom"
    | "leaveRoom"
    | "offer"
    | "answer"
    | "candidate"
    | "getPresence"
    | "serverPresence";
  server?: string;
  userId?: number;
  room?: string;
  sdp?: any;
  candidate?: any;
  rooms?: {
    roomId: string;
    users: SocketUserDto[];
  }[];
  targetUserId?: number; // for signaling target peer
}

const rtcConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    // Add TURN servers here if needed
  ],
};

const joinRoomAudioSource = require("@/assets/sound/join-room.mp3");
const leaveRoomAudioSource = require("@/assets/sound/leave-room.mp3");

export function useVoiceRoom(serverId: string) {
  const ws = useRef<WebSocket | null>(null);
  const joinAudio = useAudioPlayer(joinRoomAudioSource);
  const leaveAudio = useAudioPlayer(leaveRoomAudioSource);
  const { user } = useAuthStore();
  const { setUsersInRoom } = useRoomStore();
  const [userInVoiceRoom, setUserInVoiceRoom] = useState(false);

  const currentRoomId = useRef<string | null>(null);
  const peers = useRef<Map<number, RTCPeerConnection>>(new Map());
  const localStream = useRef<MediaStream | null>(null);

  const sendSignal = useCallback((data: SignalData) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  }, []);

  useEffect(() => {
    if (!user?.id || !serverId) return;

    ws.current = new WebSocket(voiceUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");

      sendSignal({
        type: "joinServer",
        server: serverId,
        userId: Number(user.id),
      });

      sendSignal({ type: "getPresence" });
    };

    ws.current.onmessage = async (event) => {
      const data: SignalData = JSON.parse(event.data);

      switch (data.type) {
        case "serverPresence":
          if (data.rooms) {
            // Create a new object to track all rooms
            const updatedRoomUsers: Record<string, SocketUserDto[]> = {};

            // Process each room from the presence data
            data.rooms.forEach(({ roomId, users }) => {
              updatedRoomUsers[roomId] = users;
            });

            // Also handle the case where rooms might be empty now
            // If currentRoomId exists but isn't in the presence data, set it to empty
            if (
              currentRoomId.current &&
              !data.rooms.some((room) => room.roomId === currentRoomId.current)
            ) {
              updatedRoomUsers[currentRoomId.current] = [];
            }

            // Update all rooms at once
            Object.entries(updatedRoomUsers).forEach(([roomId, users]) => {
              setUsersInRoom(roomId, users);
            });
          }
          break;

        case "answer": {
          const fromUserId = data.userId;
          if (!fromUserId || !data.sdp) break;
          console.log(`Received answer from user ${fromUserId}`);

          const pc = peers.current.get(fromUserId);
          if (!pc) break;

          await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
          break;
        }

        case "candidate": {
          const fromUserId = data.userId;
          if (!fromUserId || !data.candidate) break;

          const pc = peers.current.get(fromUserId);
          if (!pc) break;

          try {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } catch (e) {
            console.warn("Error adding received ICE candidate", e);
          }
          break;
        }
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      cleanupAllPeers();
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
      cleanupAllPeers();
    };

    // Cleanup on unmount
    return () => {
      leaveRoom();
      ws.current?.close();
    };
  }, [serverId, user?.id, sendSignal, setUsersInRoom]);

  function cleanupAllPeers() {
    peers.current.forEach((pc) => pc.close());
    peers.current.clear();

    localStream.current?.getTracks().forEach((track) => track.stop());
    localStream.current = null;
  }

  function createPeerConnection(peerUserId: number) {
    const pc = new RTCPeerConnection(rtcConfig);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: "candidate",
          candidate: event.candidate,
          targetUserId: peerUserId,
        });
      }
    };

    pc.ontrack = (event) => {
      // Handle remote audio stream here, e.g. add to Audio element or React state
      console.log("Received remote track", event.streams[0]);
    };

    // Add local stream tracks to peer connection
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current!);
      });
    }

    return pc;
  }

  async function joinRoom(roomId: string) {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN || !user?.id)
      return;

    if (currentRoomId.current === roomId) return; // Already in this room

    // Leave old room if any
    await leaveRoom();

    // Get user media (audio only)
    localStream.current = await mediaDevices.getUserMedia({ audio: true });
    setUserInVoiceRoom(true);

    // Join new room
    sendSignal({
      type: "joinRoom",
      room: roomId,
      userId: Number(user.id),
      server: serverId,
    });

    joinAudio.seekTo(0);
    joinAudio.play();

    currentRoomId.current = roomId;
  }

  async function leaveRoom() {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN || !user?.id)
      return;

    if (!currentRoomId.current) return;

    sendSignal({
      type: "leaveRoom",
      room: currentRoomId.current,
      userId: Number(user.id),
      server: serverId,
    });

    // Immediately update local state to reflect leaving
    setUsersInRoom(currentRoomId.current, []);
    setUserInVoiceRoom(false);

    currentRoomId.current = null;
    leaveAudio.seekTo(0);
    leaveAudio.play();

    cleanupAllPeers();
  }

  return {
    userInVoiceRoom,
    joinRoom,
    leaveRoom,
  };
}
