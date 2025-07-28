import { Client, Storage } from "react-native-appwrite";

// const appwriteClient = new Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL ?? "error")
//   .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? "error");

const appwriteClient = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6822fd28002cf328e22d");

const storageClient = new Storage(appwriteClient);
export { storageClient, appwriteClient };
