import { UserAvatar } from "@/components/UserAvatar";
import { useAuthStore } from "@/features/auth/store";
import { cn } from "@/lib/utils";
import { Tabs } from "expo-router";
import {
  GlobeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-nativewind";

export default function TabLayout() {
  const { user } = useAuthStore();
  const getColorClass = (color: string) => {
    switch (color) {
      case "white":
      case "#0000ff":
        return "text-blue-500";
      case "#ffffff":
        return "text-white";
      default:
        return "text-gray-400";
    }
  };
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },
        tabBarStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <LayoutDashboardIcon
              className={cn("w-7 h-7", getColorClass(color))}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discovery/index"
        options={{
          title: "Discovery",
          tabBarIcon: ({ color }) => (
            <GlobeIcon className={cn("w-7 h-7", getColorClass(color))} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => {
            return (
              <UserAvatar
                className="w-8 h-8"
                presenceClassName="w-3 h-3"
                withPresence={true}
                user={user}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
