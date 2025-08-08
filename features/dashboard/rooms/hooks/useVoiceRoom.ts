import { useAuthStore } from "@/features/auth/store";
import { voiceUrl } from "@/lib/graphql/client";
import { useEffect, useRef, useState } from "react";
import {
  RTCPeerConnection,
  RTCSessionDescription,
  RTCIceCandidate,
  mediaDevices,
  MediaStream,
} from "react-native-webrtc";

import { useAudioPlayer } from "expo-audio";
import { useRoomStore } from "../store";

interface SignalData {
  type: string;
  room: string;
  sender?: { id: string; username?: string };
  sdp?: any;
  candidate?: any;
  users?: any;
}

const joinAudioSource = require("@/assets/sound/join-room.mp3");
const leaveAudioSource = require("@/assets/sound/leave-room.mp3");

export function useVoiceRoom() {
  const { setUsersInRoom } = useRoomStore();
  const joinAudio = useAudioPlayer(joinAudioSource);
  const leaveAudio = useAudioPlayer(leaveAudioSource);
  const ws = useRef<WebSocket | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const [isInVoiceRoom, setIsInVoiceRoom] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  // For simplicity, let's assume mesh: peers keyed by userId
  const peers = useRef<Map<string, RTCPeerConnection>>(new Map());

  const { user } = useAuthStore();

  // Create peer connection config (STUN server example)
  const pcConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };

  // Open WebSocket and set up handlers
  const connectWebSocket = (roomId: string) => {
    ws.current = new WebSocket(voiceUrl);

    ws.current.onopen = () => {
      console.log("WebSocket connected");
      // Join the room on server
      sendSignal({
        type: "join",
        room: roomId,
        sender: { id: String(user?.id) },
      });
    };

    ws.current.onmessage = async (message) => {
      const data: SignalData = JSON.parse(message.data);

      if (!data.type) return;

      switch (data.type) {
        case "offer":
          await handleOffer(data);
          break;
        case "answer":
          await handleAnswer(data);
          break;
        case "candidate":
          await handleCandidate(data);
          break;
        case "presence":
          const { room, users } = data;
          if (room && Array.isArray(users)) {
            setUsersInRoom(room, users);
          }
          break;
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
      cleanup();
    };

    ws.current.onerror = (e) => {
      console.error("WebSocket error", e);
      cleanup();
    };
  };

  // Send message helper
  const sendSignal = (data: SignalData) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    }
  };

  // Get local audio stream (mic)
  const getLocalStream = async (): Promise<MediaStream> => {
    if (localStream.current) return localStream.current;

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    localStream.current = stream;
    return stream;
  };

  // Create and add peer connection for given remote user ID
  const createPeerConnection = (remoteUserId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection(pcConfig);

    // Add local stream tracks to peer connection
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStream.current!);
      });
    }

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({
          type: "candidate",
          room: currentRoom!,
          sender: { id: String(user?.id) },
          candidate: event.candidate,
        });
      }
    };

    pc.ontrack = (event) => {
      // Here you receive remote audio stream tracks
      // You might want to play them via expo-audio or react-native-webrtc's RTCView (audio only)
      console.log("Received remote track", event.streams[0]);
    };

    pc.oniceconnectionstatechange = () => {
      if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        // Cleanup peer connection on failure or disconnect
        pc.close();
        peers.current.delete(remoteUserId);
      }
    };

    peers.current.set(remoteUserId, pc);
    return pc;
  };

  // Handle offer from remote peer
  const handleOffer = async (data: SignalData) => {
    const remoteUserId = data.sender?.id;
    if (!remoteUserId) return;

    const pc = createPeerConnection(remoteUserId);
    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    sendSignal({
      type: "answer",
      room: currentRoom!,
      sender: { id: String(user?.id) },
      sdp: pc.localDescription,
    });
  };

  // Handle answer from remote peer
  const handleAnswer = async (data: SignalData) => {
    const remoteUserId = data.sender?.id;
    if (!remoteUserId) return;

    const pc = peers.current.get(remoteUserId);
    if (!pc) return;

    await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
  };

  // Handle ICE candidate from remote peer
  const handleCandidate = async (data: SignalData) => {
    const remoteUserId = data.sender?.id;
    if (!remoteUserId) return;

    const pc = peers.current.get(remoteUserId);
    if (!pc) return;

    if (data.candidate) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      } catch (e) {
        console.error("Error adding ICE candidate", e);
      }
    }
  };

  // Join voice room
  const joinRoom = async (roomId: string) => {
    if (isInVoiceRoom) return;

    await getLocalStream();

    connectWebSocket(roomId);
    setCurrentRoom(roomId);
    setIsInVoiceRoom(true);
    joinAudio.seekTo(0);
    joinAudio.play();
  };

  // Leave room and cleanup connections
  const leaveRoom = () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    peers.current.forEach((pc) => pc.close());
    peers.current.clear();

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    setCurrentRoom(null);
    setIsInVoiceRoom(false);
    // leaveAudio.seekTo(0);
    // leaveAudio.play();
  };

  // Cleanup when websocket closes or errors
  const cleanup = () => {
    peers.current.forEach((pc) => pc.close());
    peers.current.clear();

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    setCurrentRoom(null);
    setIsInVoiceRoom(false);

    leaveAudio.seekTo(0);
    leaveAudio.play();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      leaveRoom();
    };
  }, []);

  return {
    joinRoom,
    leaveRoom,
    isInVoiceRoom,
  };
}
