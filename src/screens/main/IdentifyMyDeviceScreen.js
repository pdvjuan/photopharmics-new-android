import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import { tw } from "../../../tailwind";
import { Button } from "../../base";
import GestureRecognizer from "react-native-swipe-gestures";

const IdentifyMyDeviceScreen = ({ modalVisible, setModalVisible }) => {
  return (
    <GestureRecognizer
      style={tw("flex-1")}
      onSwipeDown={() => setModalVisible(false)}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw("bg-gray-500 bg-opacity-50 flex-1 items-center")}>
          <View
            style={[
              tw(
                "bg-white h-72 w-80 rounded-xl items-center w-full mt-24 h-full p-8"
              ),
              { backgroundColor: "#f0f5f7" },
            ]}
          >
            <Text style={tw("font-nunito-700 text-2xl text-center mb-0.5")}>
              How to Idenitify Your Device
            </Text>
            <Text
              style={tw(
                "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray mt-2"
              )}
            >
              Search for the label located on the back of your Celeste device
              like in the image below.
            </Text>
            <Image
              style={[tw("my-6"), { width: 250, height: 140 }]}
              source={require("../../../assets/device-back.png")}
            />
            <Text
              style={tw(
                "font-nunito-400 text-base text-center pt-1 text-celeste-darkgray mt-0.5"
              )}
            >
              Locate the number under the barcode. This is your device number.
              In the example below the device number would be 20EN0007.
            </Text>
            <Image
              style={[tw("my-6"), { width: 300, height: 160 }]}
              source={require("../../../assets/device-barcode.png")}
            />
            <Button
              title={"Close"}
              textStyle={tw("text-white")}
              style={tw("mt-2 w-48")}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

export default IdentifyMyDeviceScreen;
