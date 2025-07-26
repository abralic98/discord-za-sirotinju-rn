import { useEffect, useState } from "react";
import { MeQueryDocument, MeQueryQuery } from "@/generated/graphql";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { getFromStorage } from "@/lib/secure-storage/storage";
import { StorageKeys } from "@/lib/secure-storage/storageKeys";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);

  useEffect(() => {
    getFromStorage(StorageKeys.TOKEN).then((storedToken) => {
      setToken(storedToken);
      setLoadingToken(false);
    });
  }, []);

  const query = useQuery({
    queryKey: [queryKeys.meQuery, token],
    enabled: Boolean(token),
    queryFn: async (): Promise<MeQueryQuery> => {
      return await requestWithAuth<MeQueryQuery>(MeQueryDocument);
    },
    select: (data) => data.meQuery,
  });

  const isAuthorized = Boolean(query.data?.id);

  return {
    isAuthorized,
    token,
    isLoading: loadingToken || (Boolean(token) && query.isLoading),
    refetch: query.refetch,
    user: query.data,
  };
};
