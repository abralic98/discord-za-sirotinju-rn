import { GraphQLClient } from "graphql-request";
import { getFromStorage } from "../keys/storage";
import { StorageKeys } from "../keys/storageKeys";
import { GraphqlCatchError } from "@/helpers/GraphqlCatchError";

// export const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "undefined";
export const apiUrl = "http://localhost:8080/graphql";

export const client = new GraphQLClient(apiUrl, {
  headers: () => ({
    Authorization: `Bearer ${getFromStorage(StorageKeys.TOKEN) || ""}`,
  }),
});

export const requestWithAuth = async <T>(
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any>,
): Promise<T> => {
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
