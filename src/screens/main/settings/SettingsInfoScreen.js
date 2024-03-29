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
import { Button, InputField, ToggleButtons } from "../../../base";
import { useAppContext } from "../../../context/AppContext";
import useUpdateUserMutation from "../../../api/cognito/mutations/useUpdateUserMutation";
import PageContainer from "../../PageContainer";
import useUpdatePasswordMutation from "../../../api/cognito/mutations/useUpdatePasswordMutation";
import PasswordInputField from "../../../base/PasswordInputField";

const SettingsInfoScreen = () => {
  const { state } = useAppContext();
  const { user } = state;

  const [givenName, setGivenName] = useState(user.given_name);
  const [familyName, setFamilyName] = useState(user.family_name);
  const [gender, setGender] = useState(user.gender);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { mutate: updatePassword, isLoading: updatePasswordLoading } =
    useUpdatePasswordMutation();
  const { mutate: updateUser, isLoading: updateUserLoading } =
    useUpdateUserMutation();

  const handlePasswordUpdate = () => {
    updatePassword({ oldPassword, newPassword });
    setOldPassword("");
    setNewPassword("");
  };

  const handleSaveBtn = () => {
    if (!givenName) Alert.alert("Please enter a first name");
    else if (!familyName) Alert.alert("Please enter a last name");
    else
      updateUser({
        given_name: givenName,
        family_name: familyName,
        gender,
      });
  };

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
                "text-xl text-celeste-darkgray font-semibold underline py-2 rounded my-2 font-nunito-800"
              )}
            >
              Login Info
            </Text>
            <InputField label="Email" value={user.email} disabled />
            <InputField
              label="Phone Number"
              value={user.phone_number}
              disabled
            />
          </View>
          <View>
            <Text
              style={tw(
                "text-xl text-celeste-darkgray font-semibold underline py-2 rounded my-2 font-nunito-800"
              )}
            >
              Personal Info
            </Text>
            <InputField
              label="First Name"
              value={givenName}
              onChange={setGivenName}
              textContentType="givenName"
            />
            <InputField
              label="Last Name"
              value={familyName}
              onChange={setFamilyName}
              textContentType="familyName"
            />
            {/* <ToggleButtons
              label="Gender"
              option1="Male"
              option2="Female"
              value={gender}
              onPress={setGender}
            /> */}
            <Button
              title={"Update Info"}
              onPress={handleSaveBtn}
              style={tw("mt-4")}
              textStyle={tw("text-white")}
              isLoading={updateUserLoading}
            />
          </View>
          <View style={tw("my-4 mb-10")}>
            <Text
              style={tw(
                "text-xl text-celeste-darkgray font-semibold underline py-2 rounded my-2"
              )}
            >
              Change Password
            </Text>
            <PasswordInputField
              label="Old Password"
              value={oldPassword}
              onChange={setOldPassword}
              textContentType="password"
              password
            />
            <PasswordInputField
              label="New Password"
              value={newPassword}
              keyboardType="numeric"
              onChange={setNewPassword}
              textContentType="newPassword"
              passwordRules="minlength: 6;"
              password
            />
            <Button
              title={"Update Password"}
              onPress={handlePasswordUpdate}
              style={tw("mt-4")}
              textStyle={tw("text-white")}
              isLoading={updatePasswordLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default SettingsInfoScreen;
