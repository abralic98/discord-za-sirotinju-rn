import { useAuthStore } from "@/features/auth/store";
import { useInboxStore } from "@/features/messaging/store";
import { Stack } from "expo-router";

export default function MessagingLayout() {
  const { activeInbox } = useInboxStore();
  const { user: currentUser } = useAuthStore();

  const inboxTitle = (): string => {
    if (!activeInbox?.users) return "Inbox";

    if (activeInbox.users.length === 1) {
      return String(currentUser?.username);
    }

    if (activeInbox.users.length === 2) {
      const secondUser = activeInbox.users.find(
        (user) => user?.id !== currentUser?.id,
      );
      return String(secondUser?.username);
    }

    if (activeInbox.users.length > 2) {
      return `${activeInbox.users.length} members`;
    } else return "Inbox";
  };
  return (
    <Stack
      screenOptions={{
        gestureEnabled: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Messaging",
        }}
      />
      <Stack.Screen
        name="dm/[id]"
        options={{
          title: inboxTitle(),
        }}
      />
    </Stack>
  );
}
