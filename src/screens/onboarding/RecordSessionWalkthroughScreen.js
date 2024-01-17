import React from "react";
import { View, Text, Image, ScrollView,TouchableOpacity, Linking } from "react-native";
import { tw } from "tailwind";
import { Button } from "../../base";
import PageContainer from "../PageContainer";
import { useAppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/core";

const RecordSessionWalkthroughScreen = () => {
  const { dispatch } = useAppContext();
  const { navigate } = useNavigation();

  const handlePhonePress = () => {
    Linking.openURL('tel:1-888-509-7047');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:LIGHT-PD.CelesteSupport@chet.rochester.edu');
  };

  return (
    <PageContainer noHeader={true} style={tw("flex-1 justify-center")}>
      <ScrollView>
        <View style={tw("flex-1 p-10 items-center mt-16")}>
          <Text style={tw("font-nunito-700 text-2xl text-center mb-2")}>
            Your daily sessions
          </Text>
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            To begin a daily session, press the green button (device must be plugged in).
          </Text>
          <Image
            style={[tw("my-6"), { width: 250, height: 140 }]}
            source={require("../../../assets/blankDevice1.png")}
          />
          <Text
            style={tw(
              "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
            )}
          >
            Your session is now in progress.
          </Text>
          {/* <Image
            style={[tw("my-6"), { width: 250, height: 140 }]}
            source={require("../../../assets/blankDeviceBlueScreen.png")}
          /> */}
          <Text
          style={tw(
            "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray"
          )}
        >
          The device will automatically turn off at the end of each session.
          For troubleshooting, review the Quick Start Guide that came with 
          your device. Concerns or questions?
          
          
        
        </Text>
        <TouchableOpacity onPress={handlePhonePress}>
            <Text style={tw("text-celeste-blue underline text-center pt-1")}>
              Call us at 1-888-509-7047
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={tw("text-celeste-blue underline text-center pt-1")}>
              Email us at LIGHT-PD.CelesteSupport@chet.rochester.edu
            </Text>
          </TouchableOpacity>
          <Button
            style={tw("mt-12 w-80")}
            title="Finish"
            onPress={() => dispatch({ type: "FIRST_TIME", payload: false })}
            textStyle={tw("text-white font-nunito-700 text-base")}
          />
          <Button
            style={tw("bg-transparent border-0 mt-2")}
            title="Back"
            onPress={() => navigate("Welcome")}
            textStyle={tw(
              "text-white font-nunito-700 text-base text-celeste-blue"
            )}
          />
        </View>
      </ScrollView>
    </PageContainer>
  );
};

export default RecordSessionWalkthroughScreen;
