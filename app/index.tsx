import { getFromStorage } from "@/lib/keys/storage";
import { StorageKeys } from "@/lib/keys/storageKeys";
import routes from "@/lib/routes";
import { Redirect } from "expo-router";

export default function Index() {
  const token = getFromStorage(StorageKeys.TOKEN);
  return <Redirect href={token !== null ? routes.dashboard : routes.login} />;
}
