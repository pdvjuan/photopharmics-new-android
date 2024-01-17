import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { tw } from "tailwind";
import { InputField } from "../../../base";
import { Button } from "../../../base";
import ModalScreen from "../../../base/ModalScreen";
import useUpdateSupporterMutation from "../../../api/celeste/mutations/useUpdateSupporterMutation";
import { useAppContext } from "../../../context/AppContext";
import { useNavigation } from "@react-navigation/core";
import useSupporterQuery from "../../../api/celeste/queries/useSupporterQuery";

const EditSupporterScreen = ({ route }) => {
  const { supporterId } = route.params;
  const { state } = useAppContext();
  const [phoneNumber, setPhoneNumber] = useState("");
  const { goBack } = useNavigation();
  const { mutate: updateSupporter } = useUpdateSupporterMutation();
  const { data: supporter, isLoading } = useSupporterQuery(
    state?.user?.sub,
    supporterId
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(supporter?.firstName);
    setLastName(supporter?.lastName);
    setPhoneNumber(supporter?.phone);
  }, [supporter]);

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
          disabled={true}
          keyboardType="phone-pad"
        />
        <View style={tw("absolute bottom-0 w-full mb-10 mx-4")}>
          <Button
            onPress={() => {
              updateSupporter({
                userId: state?.user?.sub,
                supporterId: supporter.supporterId,
                supporter: {
                  firstName: firstName,
                  lastName: lastName,
                },
              });
              goBack();
            }}
            title="Save"
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

export default EditSupporterScreen;
