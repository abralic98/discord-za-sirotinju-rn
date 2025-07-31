import { Button } from "@/components/ui/Button";
import {
  GenerateInviteLinkDocument,
  GenerateInviteLinkMutation,
  Server,
} from "@/generated/graphql";
import { handleGraphqlError } from "@/helpers/GraphqlCatchError";
import { showSuccess } from "@/helpers/Toast";
import { requestWithAuth } from "@/lib/graphql/client";
import { TextMd } from "@/lib/typography";
import { useMutation } from "@tanstack/react-query";

import * as Clipboard from "expo-clipboard";

export const CreateInvitationLink = ({ server }: { server: Server | null }) => {
  const createInvitationMutation = useMutation({
    mutationFn: async () => {
      if (server?.id)
        return requestWithAuth<GenerateInviteLinkMutation>(
          GenerateInviteLinkDocument,
          {
            serverId: server.id,
          },
        );
    },
    onSuccess: (res) => {
      if (res?.generateInviteLink) {
        copyToClipboard(res.generateInviteLink);
      }
    },
    onError: (error) => {
      handleGraphqlError(error);
    },
  });

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    showSuccess({ title: "Invitation link copied to clipboard" });
  };

  return (
    <Button
      className="w-[40%]"
      onPress={() => {
        createInvitationMutation.mutateAsync();
      }}
      loading={createInvitationMutation.isPending}
    >
      <TextMd className="font-semibold">Create invitation</TextMd>
    </Button>
  );
};
