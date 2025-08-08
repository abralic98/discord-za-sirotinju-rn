import "react-native-webrtc";

declare module "react-native-webrtc" {
  interface RTCPeerConnection {
    onicecandidate?: (event: any) => void;
    ontrack?: (event: any) => void;
    oniceconnectionstatechange?: () => void;
    onnegotiationneeded?: () => void;
  }
}
