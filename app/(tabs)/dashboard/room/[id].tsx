import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import { MessageList } from "@/features/dashboard/messages/MessageList";
import { RoomHeader } from "@/features/dashboard/messages/RoomHeader";
import { SendMessage } from "@/features/dashboard/messages/SendMessage";

export default function RoomPage() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-dark-server-sidebar">
      <KeyboardAvoidingWrapper keyboardVerticalOffset={0}>
        <View className="flex-1 w-full bg-dark-active-server">
          <RoomHeader />
          <MessageList />
          <SendMessage />
        </View>
      </KeyboardAvoidingWrapper>
    </SafeAreaView>
  );
}
