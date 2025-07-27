import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import CustomSplash from "@/components/CustomSplash";
import routes from "@/lib/routes";
import { useRouter } from "expo-router";

export default function Index() {
  const { isAuthorized, isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShowSplash(false);
        router.replace(isAuthorized ? routes.dashboard : routes.login);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (showSplash || isLoading) {
    return <CustomSplash />;
  }

  return null;
}
