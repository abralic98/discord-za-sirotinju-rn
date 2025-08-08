import { GraphQLClient } from "graphql-request";
import { GraphqlCatchError } from "@/helpers/GraphqlCatchError";
import { getFromStorage } from "../secure-storage/storage";
import { StorageKeys } from "../secure-storage/storageKeys";

const prod = "https://ezcomms.linkpc.net/graphql";
const prodw = "wss://ezcomms.linkpc.net/graphql";
// export const apiUrl = prod;
// export const wsUrl = prodw;
export const apiUrl = "http://192.168.1.93:8080/graphql";

//ipconfig getifaddr en0
// export const wsUrl = "ws://localhost:8080/graphql";
export const wsUrl = "ws://192.168.1.93:8080/graphql";
export const voiceUrl = "ws://192.168.1.93:8080/ws/voice";
// export const voiceUrl = "wss://ezcomms.linkpc.net/ws/voice";

export const requestWithAuth = async <T>(
  query: string,
  variables?: Record<string, any>,
): Promise<T> => {
  const token = await getFromStorage(StorageKeys.TOKEN);
  const client = new GraphQLClient(apiUrl, {
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
  });

  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    const err = error as GraphqlCatchError;
    const errors = err?.response?.errors;
    if (Array.isArray(errors)) {
      const unauthorized = errors.find(
        (e) =>
          e.message === "Unauthorized" ||
          e?.extensions?.classification === "UNAUTHORIZED",
      );
      // if (unauthorized) {
      //   window.location.href = "/auth/login";
      //   return Promise.reject(unauthorized);
      // }
    }

    throw error;
  }
};

export const publicClient = new GraphQLClient(apiUrl, {});
