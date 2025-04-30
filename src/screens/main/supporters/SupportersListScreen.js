import React from "react";
import { useAppContext } from "../../../context/AppContext";
import useSupportersQuery from "../../../api/celeste/queries/useSupportersQuery";
import { Button } from "../../../base";
import SupporterListItem from "../../../components/SupporterListItem";
import SupporterActions from "../../../components/SupporterActions";
import PageContainer from "../../PageContainer";
import { tw } from "../../../../tailwind";
import { SwipeListView } from "react-native-swipe-list-view";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";

// When you move out of clinical trials delete me. You will have to remove me from the add button as well
const ONE_SUPPORTER = true;

const SupportersListScreen = ({ navigation }) => {
  const { state } = useAppContext();
  const {
    data: supporters,
    isLoading,
    isError,
  } = useSupportersQuery(state?.user?.sub);

  if (isLoading)
    return (
      <PageContainer>
        <View style={tw("py-4")}>
          <ActivityIndicator size="large" color="gray" />
        </View>
      </PageContainer>
    );
  if (isError)
    return (
      <PageContainer>
        <Text>Something Went Wrong</Text>
      </PageContainer>
    );

  return (
    <PageContainer>
      {!supporters.length > 0 && (
        <View style={tw("flex-1 justify-center items-center")}>
          <Text style={tw("text-lg font-nunito-600")}>Add a supporter.</Text>
        </View>
      )}
      <SwipeListView
        data={supporters}
        keyExtractor={(supporter) => supporter.supporterId}
        renderItem={({ item }) => <SupporterListItem supporter={item} />}
        renderHiddenItem={({ item }) => <SupporterActions supporter={item} />}
        rightOpenValue={-200}
      />
      <SafeAreaView>
        <Button
          style={tw("pb-16 py-4")}
          textStyle={tw("text-xl text-white")}
          onPress={() => navigation.navigate("Add Supporter")}
          disabled={isLoading || (supporters.length > 0 && ONE_SUPPORTER)}
          title="Add Supporter"
        />
      </SafeAreaView>
    </PageContainer>
  );
};

export default SupportersListScreen;
