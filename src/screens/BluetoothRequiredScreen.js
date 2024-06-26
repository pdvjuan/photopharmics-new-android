import React, { useState } from "react";
import { Image, Text, StyleSheet, View, Platform } from "react-native";
import { Button } from "../base";
import { tw } from "tailwind";
import OpenAppSettings from "../helpers/device/OpenAppSettings";
import OpenBTSettings from "../helpers/device/OpenBTSettings";
import PageContainer from "./PageContainer";

const BluetoothRequiredScreen = ({ error, refetch }) => {
  const [showError, setShowError] = useState(false);
  let popup = null;
  
  const getErrorMessage = () => {
    let message = error;
    

    if (error.includes("powered")) {
      message = "You may have your bluetooth turned off. Please turn it on in settings.";
      popup = OpenBTSettings;
    } else if (error.includes("authorized")) {
      message = `Application needs ${
        Platform.OS === "ios" ? "bluetooth" : "nearby devices and location" 
      } permissions. Please enable them in application settings.`;
      popup = OpenAppSettings;
    }

    return <Text style={tw('font-nunito-400 text-base py-4 text-center')}>{message}</Text> 
  };

  return (
    <PageContainer>
      <View style={tw("flex-1 justify-between")}>
        <View style={tw("items-center")}>
          <Image
            style={[tw("w-3/4 h-64"), styles.image]}
            source={require("../../assets/logo.png")}
          />
          {getErrorMessage()}
          <View style={tw("flex-row")}>
            <Button
              style={tw("mx-1 bg-gray-500 border-gray-500")}
              textStyle={tw("text-white")}
              title="Open Settings"
              onPress={popup}
            />
            <Button
              style={tw("mx-1")}
              textStyle={tw("text-white")}
              title="Retry"
              onPress={refetch}
            />
          </View>
        </View>
        <View>
          {error && showError ? (
            <Text style={tw("text-center font-nunito-400")}>{error}</Text>
          ) : (
            <Button title="Show Error" onPress={() => setShowError(true)} />
          )}
        </View>

        {/* THIS IS A HIDDEN VIEW TO HANDLE THE BUG OF COLORS BEING PURGED IF NOT SOMEWHERE IN TW */}
        <View style={tw("w-0 h-0 bg-celeste-darkgray bg-yellow-500")} />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
});

export default BluetoothRequiredScreen;
