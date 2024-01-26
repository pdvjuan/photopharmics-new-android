import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform
} from "react-native";
import { tw, getColor } from "../../tailwind";
import useCurrentUserQuery from "../api/cognito/queries/useCurrentUserQuery";

const LoadingScreen = () => {
  const { isLoading: isGettingCurrentUser } = useCurrentUserQuery();

  let status = "Loading assets";
  status = isGettingCurrentUser ? "Logging In" : status;

  return (
    // TODO: Replace
    // This <View> directly below used to be a LinearGradient before removing Expo
    <View
      // colors={["#FFFFFF", "#DFECFF"]}
      // locations={["0", ".5"]}
      style={tw("flex-1 flex-col justify-center items-center bg-white")}
    >
      <Image
        style={[tw("w-3/4 h-64"), styles.image]}
        source={require("../../assets/logo.png")}
      />
      <Text style={tw("text-xl text-celeste-darkgray pb-2")}>{status}</Text>
      <ActivityIndicator
        size={Platform.OS === "ios" ? "small" : 30}
        color={getColor("gray-500")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

export default LoadingScreen;
