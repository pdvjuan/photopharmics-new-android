import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { tw } from "../../../../tailwind";
import { InputField } from "../../../base";
import { Button } from "../../../base";
import ModalScreen from "../../../base/ModalScreen";
import { useAppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/core";
import usePostSupporterMutation from "../../../api/celeste/mutations/usePostSupporterMutation";

const AddSupporterScreen = () => {
  const { state } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { goBack } = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { mutate: createSupporter, isLoading } = usePostSupporterMutation();

  const handleAddSupporterBtn = () => {
    if (!firstName) Alert.alert("Please enter a first name.");
    else if (!lastName) Alert.alert("Please enter a last name.");
    else if (!phoneNumber) Alert.alert("Please enter a phone number.");
    else {
      createSupporter({
        userId: state?.user?.sub,
        supporter: {
          userId: state?.user?.sub,
          firstName: firstName,
          lastName: lastName,
          phone: phoneNumber,
          priority: 0,
        },
      });
      goBack();
    }
  };

  return (
    <ModalScreen>
      <View style={tw("flex-1 bg-white w-full px-4 pt-8")}>
        <InputField
          label="First Name"
          value={firstName}
          onChange={setFirstName}
          autoCapitalize="words"
        />
        <InputField
          label="Last Name"
          value={lastName}
          onChange={setLastName}
          autoCapitalize="words"
        />
        <InputField
          label="Phone Number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <View style={tw("mt-12")}>
          <Button
            onPress={() => {
              handleAddSupporterBtn();
            }}
            title="Add Supporter"
            isLoading={isLoading}
            textStyle={tw("text-white")}
            style={tw("mb-4")}
          />
          <TouchableOpacity onPress={goBack}>
            <View style={[tw("p-2 rounded items-center")]}>
              <Text style={{ ...tw("text-base text-celeste-blue") }}>
                {isLoading ? (
                  <ActivityIndicator
                    style={tw("pt-1")}
                    size="small"
                    color="black"
                  />
                ) : (
                  "Cancel"
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ModalScreen>
  );
};

export default AddSupporterScreen;
