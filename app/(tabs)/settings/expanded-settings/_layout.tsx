import { Stack, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-nativewind";

export default function ExpandedSettingsLayout() {
  const { back } = useRouter();
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
          title: "Settings",
          headerLeft: () => (
            <ArrowLeftIcon onPress={back} className="w-8 h-8 text-white" />
          ),
          animation: "slide_from_left",
        }}
      />
      <Stack.Screen
        name="account/index"
        options={{
          title: "Account Settings",
          headerBackTitle: "Settings",
        }}
      />
      <Stack.Screen
        name="notifications/index"
        options={{
          title: "Notifications",
          headerBackTitle: "Settings",
        }}
      />
    </Stack>
  );
}
