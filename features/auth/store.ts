import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { User } from "@/generated/graphql";
import {
  deleteFromStorage,
  getFromStorage,
  saveToStorage,
} from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";

interface AuthStore {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set) => ({
      token: null,
      user: null,
      setAuth: (token, user) => {
        set({ token, user }, false, "setAuth");
        saveToStorage(StorageKeys.TOKEN, token);
      },
      clearAuth: () => {
        set({ token: null, user: null }, false, "clearAuth");
        deleteFromStorage(StorageKeys.TOKEN);
      },
    }),
    { name: "AuthStore" },
  ),
);

export async function hydrateAuthStore() {
  const token = await getFromStorage(StorageKeys.TOKEN);
  if (token) {
    useAuthStore.getState().setAuth(token, null);
  }
}
