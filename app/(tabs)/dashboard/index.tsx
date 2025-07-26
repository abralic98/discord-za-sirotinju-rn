import { ServerListSidebar } from "@/features/dashboard/servers/ServerListSidebar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardPage() {
  return (
    <SafeAreaView edges={["top"]}>
      <ServerListSidebar />
    </SafeAreaView>
  );
}
