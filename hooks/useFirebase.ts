import { useEffect } from "react";
import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { PermissionsAndroid, Platform, Alert } from "react-native";
import { saveToStorage } from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";
import notifee, {
  AndroidStyle,
  NotificationAndroid,
} from "@notifee/react-native";

export const useFirebase = () => {
  useEffect(() => {
    requestUserPermission();

    //bg
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

    //foregrond
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const title = remoteMessage.notification?.title ?? "New Message";
      const body =
        remoteMessage.notification?.body ?? "You have a new notification.";
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  async function onDisplayNotification(
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) {
    await notifee.requestPermission();

    const data = remoteMessage.data || {};
    const title =
      remoteMessage.notification?.title ?? data.title ?? "New Message";
    const body =
      remoteMessage.notification?.body ??
      data.body ??
      "You have a new notification.";

    const authorAvatar = data.authorAvatar || undefined;
    const messageImage = data.messageImage || undefined;

    const channelId = await notifee.createChannel({
      id: "default",
      name: "Default Channel",
    });

    const androidOptions: NotificationAndroid = {
      channelId,
      smallIcon: "ic_launcher",
      pressAction: {
        id: "default",
      },
      ...(authorAvatar && { largeIcon: authorAvatar }),
      ...(messageImage && {
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: messageImage,
        },
      }),
    };

    await notifee.displayNotification({
      title: String(title),
      body: String(body),
      android: androidOptions,
    });
  }

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
      getFcmToken();
    }
  }

  async function getFcmToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        saveToStorage(StorageKeys.FCMTOKEN, token);
        console.log("📱 FCM Token:", token);
      }
    } catch {}
  }
};
