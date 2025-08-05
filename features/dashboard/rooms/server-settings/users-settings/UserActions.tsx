import { CustomBottomSheet } from "@/components/CustomBottomSheet";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextMd } from "@/lib/typography";
import React, { useState } from "react";
import { View } from "react-native";
import { KickUser } from "./KickUser";
import { User } from "@/generated/graphql";
import { BanUser } from "./BanUser";

export const UserActions = ({ user }: { user?: User | null }) => {
  const [value, setValue] = useState("kick");
  return (
    <View>
      <CustomBottomSheet
        trigger={(open) => (
          <Button onPress={open}>
            <TextMd>Actions</TextMd>
          </Button>
        )}
      >
        <View className="flex-1 justify-center px-2">
          <Tabs value={value} onValueChange={setValue}>
            <TabsList className="flex-row items-start justify-start w-full gap-4">
              <TabsTrigger value="kick" className="bg-dark-primary">
                <TextMd>Kick</TextMd>
              </TabsTrigger>
              <TabsTrigger value="ban" className="bg-dark-error">
                <TextMd>Ban</TextMd>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="h-36 pt-4" value="kick">
              <KickUser user={user} />
            </TabsContent>
            <TabsContent value="ban">
              <BanUser user={user} />
            </TabsContent>
          </Tabs>
        </View>
      </CustomBottomSheet>
    </View>
  );
};
