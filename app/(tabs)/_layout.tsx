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
  console.log(user, "user");
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
      }}
    >
      <Tabs.Screen
        name="dashboard/index"
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
        name="settings/index"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <SettingsIcon className={cn("w-7 h-7", getColorClass(color))} />
          ),
        }}
      />
    </Tabs>
  );
}
