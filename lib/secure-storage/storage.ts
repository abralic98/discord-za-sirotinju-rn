import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "./storageKeys";

export const saveToStorage = async (key: StorageKeys, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

export const getFromStorage = async (key: StorageKeys) => {
  let result = await SecureStore.getItemAsync(key);
  return result;
};

export const deleteFromStorage = async (key: StorageKeys) => {
  await SecureStore.deleteItemAsync(key);
};
