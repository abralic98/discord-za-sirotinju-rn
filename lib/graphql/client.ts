import { GraphQLClient } from "graphql-request";
import { GraphqlCatchError } from "@/helpers/GraphqlCatchError";
import { getFromStorage } from "../secure-storage/storage";
import { StorageKeys } from "../secure-storage/storageKeys";

// export const apiUrl = "http://localhost:8080/graphql";
export const apiUrl = "http://192.168.1.93:8080/graphql";

// export const wsUrl = "ws://localhost:8080/graphql";
export const wsUrl = "ws://192.168.1.93:8080/graphql";

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
