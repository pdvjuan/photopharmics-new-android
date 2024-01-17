import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { tw } from "tailwind";
import { Button } from "../../base";
import PageContainer from "../PageContainer";
import { useAppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/core";

const SyncWalkthroughScreen = () => {
  const { dispatch } = useAppContext();
  const { navigate } = useNavigation();

  return (
    <PageContainer noHeader={true} style={tw("flex-1 justify-center")}>
      <ScrollView>
        <View style={tw("flex-1 p-10 mt-10 items-center")}>
          <Text style={tw("font-nunito-700 text-2xl text-center mb-2")}>
            Uploading sessions information from the Celeste device...
          </Text>
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            Whenever you start or finish a Celeste session, open this
            application again onyour mobile phone.
          </Text>
          <Image
            style={[tw("my-6"), { width: 90, height: 90 }]}
            source={require("../../../assets/appIconWalkthrough.png")}
          />
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            Once your Celeste device is plugged into the wall, tap the “sync”
            button in the top right corner of this application.
          </Text>
          <Image
            style={[tw("my-6"), { width: 250, height: 140 }]}
            source={require("../../../assets/device-success.png")}
          />
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            Log all of your sessions by opening Celeste mobile every day!
          </Text>
          <Button
            style={tw("mt-12 w-72")}
            title="Finish"
            onPress={() => dispatch({ type: "FIRST_TIME", payload: false })}
            textStyle={tw("text-white font-nunito-700 text-base")}
          />
          <Button
            style={tw("bg-transparent border-0 mt-2")}
            title="Back"
            onPress={() => navigate("RecordSessionWalkthrough")}
            textStyle={tw(
              "text-white font-nunito-700 text-base text-celeste-blue"
            )}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default SyncWalkthroughScreen;
