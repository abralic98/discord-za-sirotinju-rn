import { firebaseConfig } from "@/lib/firebase/firebaseConfig";
import { initializeApp } from "firebase/app";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";

export const useFirebase = () => {
  const app = initializeApp(firebaseConfig);

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
        console.log("FCM Token:", token);
      } else {
        console.log("Failed to get FCM token");
      }
    } catch (error) {
      console.log("Error getting FCM token:", error);
    }
  }

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  useEffect(() => {
    requestUserPermission();
  }, []);
};
