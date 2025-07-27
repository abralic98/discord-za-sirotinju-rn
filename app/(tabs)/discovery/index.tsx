import { FormInput } from "@/components/input/FormInput";
import { ServerList } from "@/features/discovery/ServerList";
import { TextXl3 } from "@/lib/typography";
import { SearchIcon } from "lucide-nativewind";
import { FormProvider, useForm } from "react-hook-form";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DiscoveryPage() {
  const form = useForm();
  return (
    <SafeAreaView>
      <View className="p-4 w-full gap-4">
        <FormProvider {...form}>
          <TextXl3>Find servers</TextXl3>
          <FormInput
            icon={<SearchIcon className="text-white" />}
            name="search"
            placeholder="Start typing..."
          />
          <ServerList />
        </FormProvider>
      </View>
    </SafeAreaView>
  );
}
