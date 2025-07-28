import { useEffect } from "react";
import { createClient, Client } from "graphql-ws";
import { useAuthStore } from "@/features/auth/store";
import { useRoomStore } from "../../rooms/store";
import { SubscribeToMessagesByRoomIdDocument } from "@/generated/graphql";

export const useRoomConnection = (onMessage: (msg: any) => void) => {
  const { activeRoom } = useRoomStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!activeRoom) return;

    const client: Client = createClient({
      url: `ws://localhost:8080/graphql?room/${activeRoom.id}`,
      connectionParams: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      lazy: false,
      retryAttempts: 0,
    });

    const disposeSubscribe = client.subscribe(
      {
        query: SubscribeToMessagesByRoomIdDocument,
        variables: { roomId: String(activeRoom.id) },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByRoomId) {
            onMessage(data.data.subscribeToMessagesByRoomId);
          }
        },
        error: (err) => {
          console.error("Subscription error:", err);
        },
        complete: () => {
          console.log("Subscription complete");
        },
      },
    );

    return () => {
      disposeSubscribe();
      client.dispose();
    };
  }, [activeRoom]);
};
