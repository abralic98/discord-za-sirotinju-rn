import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform } from "react-native";
import { showSuccess } from "@/helpers/Toast";
import { saveToStorage } from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";

export const useFirebase = () => {
  useEffect(() => {
    requestUserPermission();
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
  }, []);

  async function requestUserPermission() {
    if (Platform.OS === "android") {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }

    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      getFcmToken();
    }
  }

  async function getFcmToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        saveToStorage(StorageKeys.FCMTOKEN, token);
        console.log("FCM Token:", token);
      } else {
        console.log("Failed to get FCM token");
      }
    } catch (error) {
      console.log("Error getting FCM token:", error);
    }
  }
};
