import { UserPresenceType } from "@/generated/graphql";
import { cn } from "@/lib/utils";
import { View } from "react-native";

export const UserPresence = ({
  presence,
  className,
}: {
  presence?: UserPresenceType | null;
  className?: string;
}) => {
  return <Status presence={presence ?? UserPresenceType.Offline} className={className} />;
};

const Status = ({
  presence,
  className,
}: {
  presence: UserPresenceType;
  className?: string;
}) => {
  const statusColor = {
    [UserPresenceType.Online]: "bg-green-500",
    [UserPresenceType.Away]: "bg-orange-500",
    [UserPresenceType.Busy]: "bg-red-500",
    [UserPresenceType.Offline]: "bg-gray-500",
  }[presence];

  return (
    <View
      className={cn(
        statusColor,
        "w-4 h-4 absolute bottom-0 right-0 rounded-full border border-black",
        className,
      )}
    />
  );
};
