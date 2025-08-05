import { KeyboardAvoidingWrapper } from "@/components/KeyboardAvoidingWrapper";
import { AccountInformation } from "@/features/settings/account/AccountInformation";
import { AccountManagement } from "@/features/settings/account/AccountManagement";
import { EditPassword } from "@/features/settings/account/EditPassword";
import { ScrollView, View } from "react-native";

export default function AccountSettingsPage() {
  return (
    <KeyboardAvoidingWrapper keyboardVerticalOffset={100}>
      <ScrollView className="h-full p-4 bg-dark-server-sidebar">
        <View className="gap-4">
          <AccountInformation />
          <EditPassword />
          <AccountManagement />
        </View>
      </ScrollView>
    </KeyboardAvoidingWrapper>
  );
}
