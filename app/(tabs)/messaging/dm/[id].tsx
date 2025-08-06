import { View } from "react-native";
import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import { DirectMessageList } from "@/features/messaging/components/DirectMessageList";
import { SendDirectMessage } from "@/features/messaging/components/SendDirectMessage";

export default function DmPage() {
  return (
    <KeyboardAvoidingWrapper keyboardVerticalOffset={100}>
      <View className="flex-1 w-full bg-dark-active-server">
        <DirectMessageList />
        <SendDirectMessage />
      </View>
    </KeyboardAvoidingWrapper>
  );
}
