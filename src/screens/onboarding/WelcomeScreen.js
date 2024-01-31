import React from "react";
import { View, Text } from "react-native";
import { tw } from "tailwind";
import { Button } from "../../base";
import PageContainer from "../PageContainer";
import { useAppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/core";

const WelcomeScreen = () => {
  const { dispatch } = useAppContext();
  const { navigate } = useNavigation();

  return (
    <PageContainer noHeader={true} style={tw("flex-1 justify-center")}>
      <View style={tw("flex-1 p-10 mt-20")}>
        <Text style={tw("font-nunito-700 text-2xl text-center mb-0.5")}>
          Welcome to Celeste® mobile
        </Text>
        <Text
          style={tw(
            "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
          )}
        >
          You can now track your daily Celeste sessions, set reminders, and manage your account.
          As part of the Celeste Light for PD Clinical Trial, you agree to complete a 60- minute 
          session daily. The Celeste Mobile application will track completed sessions by 
          collecting data from your device.
        </Text>
        <Button
          style={tw("mt-12")}
          title="Continue"
          onPress={() => navigate("RecordSessionWalkthrough")}
          textStyle={tw("text-white font-nunito-700 text-base")}
        />
        <Button
          style={tw("bg-transparent border-0 mt-4")}
          title="Skip"
          onPress={() => dispatch({ type: "FIRST_TIME", payload: false })}
          textStyle={tw(
            "text-white font-nunito-700 text-base text-celeste-blue"
          )}
        />
      </View>
    </PageContainer>
  );
};

export default WelcomeScreen;
