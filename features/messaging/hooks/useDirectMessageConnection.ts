import { useEffect } from "react";
import { createClient, Client } from "graphql-ws";
import { useInboxStore } from "../store";
import { SubscribeToMessagesByInboxIdDocument } from "@/generated/graphql";
import { wsUrl } from "@/lib/graphql/client";
import { useAuthStore } from "@/features/auth/store";

export const useDirectMessageConnection = (onMessage: (msg: any) => void) => {
  const { activeInbox } = useInboxStore();
  const { token } = useAuthStore();

  useEffect(() => {
    if (!activeInbox?.id) return;

    const client: Client = createClient({
      url: `${wsUrl}?messaging/${activeInbox.id}`,
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
        query: SubscribeToMessagesByInboxIdDocument,
        variables: {
          inboxId: activeInbox.id,
        },
      },
      {
        next: (data) => {
          if (data.data?.subscribeToMessagesByInboxId) {
            onMessage(data.data.subscribeToMessagesByInboxId);
          }
        },
        error: (err) => {
          console.error("Subscription error (inbox):", err);
        },
        complete: () => {
          console.log("Direct message subscription complete");
        },
      },
    );

    return () => {
      disposeSubscribe(); // clean up subscription
      client.dispose(); // close socket connection properly
    };
  }, [activeInbox?.id]);
};
