import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  Alert,
} from "react-native";
import { tw } from "tailwind";
import { Button, InputField } from "../../../base";
import PageContainer from "../../PageContainer";
import useSavedDeviceQuery from "../../../api/device/queries/useSavedDeviceQuery";
import useDeleteSavedDeviceMutation from "../../../api/device/mutations/useDeleteSavedDeviceMutation";

const SettingsDeviceScreen = () => {
  const [deviceName, setDeviceName] = useState();
  const { data: savedDevice, isLoading: savedDeviceLoading } =
    useSavedDeviceQuery();
  const { mutate: deleteSavedDevice, isLoading: deleteSavedDeviceLoading } =
    useDeleteSavedDeviceMutation();

  useEffect(() => {
    setDeviceName(savedDevice);
  }, [savedDevice]);

  return (
    <PageContainer noHeader>
      <KeyboardAvoidingView
        style={tw("flex-1")}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={tw("px-4")}>
          <View>
            <Text
              style={tw(
                "text-xl text-celeste-darkgray font-semibold underline py-2 rounded mt-2 font-nunito-800"
              )}
            >
              Saved Device
            </Text>
            <InputField
              value={deviceName == "" ? "None" : deviceName}
              textContentType="givenName"
              disabled={true}
            />
            {deviceName != "" && (
              <Button
                title={"Delete Saved Device"}
                onPress={() => deleteSavedDevice({ deviceName })}
                style={tw("mt-4")}
                textStyle={tw("text-white")}
                isLoading={deleteSavedDeviceLoading}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default SettingsDeviceScreen;
