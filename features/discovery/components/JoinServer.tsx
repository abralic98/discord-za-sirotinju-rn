import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/features/auth/store";
import { useRoomStore } from "@/features/dashboard/rooms/store";
import {
  JoinServerDocument,
  JoinServerMutation,
  JoinServerMutationVariables,
  Server,
} from "@/generated/graphql";
import { GraphqlCatchError } from "@/helpers/GraphqlCatchError";
import { showError, showSuccess } from "@/helpers/Toast";
import { requestWithAuth } from "@/lib/graphql/client";
import { queryClient } from "@/lib/react-query/queryClient";
import { queryKeys } from "@/lib/react-query/queryKeys";
import routes from "@/lib/routes";
import { TextMd } from "@/lib/typography";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export const JoinServer = ({ server }: { server: Server }) => {
  const { user } = useAuthStore();
  const { push } = useRouter();
  const { setActiveServer } = useRoomStore();
  const joinServerMutation = useMutation({
    mutationFn: async (data: JoinServerMutationVariables) => {
      const res = await requestWithAuth<JoinServerMutation>(
        JoinServerDocument,
        data,
      );
      return res;
    },
    onSuccess: (data) => {
      if (data.joinServer?.id) {
        showSuccess({ title: `Welcome to ${data.joinServer.name}` });
        setActiveServer(data.joinServer);
        queryClient.refetchQueries({ queryKey: [queryKeys.getAllServers] });
        push(routes.dashboard);
      }
    },
    onError: (error) => {
      const err = error as unknown as GraphqlCatchError;
      showError({ title: `${err.response.errors[0].message}` });
    },
  });

  const joinServer = () => {
    if (!server.id) return null;
    joinServerMutation.mutateAsync({
      input: {
        id: server.id,
      },
    });
  };

  const redirect = () => {
    setActiveServer(server);
    push(routes.dashboard);
  };

  const joinedUsersIds = server.joinedUsers?.map((u) => u?.id);

  const renderButton = () => {
    if (joinedUsersIds?.includes(user?.id)) {
      return (
        <Button onPress={redirect}>
          <TextMd className="font-semibold">Already joined</TextMd>
        </Button>
      );
    } else {
      return (
        <Button onPress={joinServer}>
          <TextMd className="font-semibold">Join Server</TextMd>
        </Button>
      );
    }
  };
  return <View>{renderButton()}</View>;
};
