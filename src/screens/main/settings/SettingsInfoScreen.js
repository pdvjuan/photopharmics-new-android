import React, { useEffect, useState, useRef } from "react";
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  Alert, ScrollView
} from "react-native";
import { tw } from "tailwind";
import { Button, InputField} from "../../../base";
import { useFocusEffect } from '@react-navigation/native';
import { useAppContext } from "../../../context/AppContext";
import useUpdateUserMutation from "../../../api/cognito/mutations/useUpdateUserMutation";
import PageContainer from "../../PageContainer";
//import useUpdatePasswordMutation from "../../../api/cognito/mutations/useUpdatePasswordMutation";
import useForgotPasswordMutation from "../../../api/cognito/mutations/useForgotPasswordMutationInSettings";
import useForgotPasswordSubmitMutation from "../../../api/cognito/mutations/useForgotPasswordSubmitMutationInSettings";
import PasswordInputField from "../../../base/PasswordInputField";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const SettingsInfoScreen = () => {
  const { state } = useAppContext();
  const { user } = state;
  const [focus, setFocus] = useState(null);
  const [givenName, setGivenName] = useState(user.given_name);
  const [familyName, setFamilyName] = useState(user.family_name);
  //const [gender, setGender] = useState(user.gender);
  const [code, setCode] = useState("");
  //const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const { mutate: updatePassword, isLoading: updatePasswordLoading } =
  //   useUpdatePasswordMutation();
  const { mutate: forgotPasswordSubmit, passwordResetLoading } =
    useForgotPasswordSubmitMutation();

  const { mutate: forgotPassword, isLoadingCode } =
    useForgotPasswordMutation(user.email);

  const { mutate: updateUser, isLoading: updateUserLoading } =
    useUpdateUserMutation();

  const scrollViewRef = useRef();

  useFocusEffect(
    React.useCallback(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToPosition(0, 0, false);
      }
    }, [])
  );

  // const handlePasswordUpdate = () => {
  //   if (!oldPassword) Alert.alert("Error","Please enter old password");
  //   else if (!newPassword) Alert.alert("Error","Please enter a new password");
  //   else {
  //     updatePassword({ oldPassword, newPassword });
  //     setOldPassword("");
  //     setNewPassword("");
  //   }
  // };

  const handleResetPasswordBtn = () => {
    if (!code) {
      Alert.alert("Please enter a valid confirmation code");
      return;
    } else if (!newPassword) {
      Alert.alert("Please enter a new password");
    } else {
      forgotPasswordSubmit({
        username: user.email,
        code: code,
        password: newPassword,
      });
      setCode("");
      setNewPassword("");
    }
      
  };

    // Email validation function
    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    };
  
    const handleForgotPassword = () => {
      if (!validateEmail(user.email)) {
        Alert.alert("Invalid Email", "Please enter a valid email address.");
        return;
      }
      forgotPassword({ username: user.email });
    };
  

  const handleSaveBtn = () => {
    updateUser({
      given_name: givenName || " ",
      family_name: familyName || " ", 
      gender: gender || " ", 
    });
  };

  return ( 
    <PageContainer noHeader>
      {/* <KeyboardAvoidingView
        style={tw("flex-1")}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          behavior = {null}
          style={tw("px-4")}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={tw("px-4")} keyboardShouldPersistTaps='handled'> */}
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
              onFocus={() => setFocus(null)}
              onSubmitEditing={() => setFocus("familyName")}
            />
            <InputField
              label="Last Name"
              value={familyName}
              onChange={setFamilyName}
              textContentType="familyName"
              focus={focus === "familyName"}
              onFocus={() => setFocus(null)}
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
              Reset Password
            </Text>

            <Button
              title={"Get Confirmation Code"}
              onPress={handleForgotPassword}
              style={tw("mt-4")}
              textStyle={tw("text-white")}
              isLoading={isLoadingCode}
            />

            <InputField
              label={"Confirmation Code"}
              value={code}
              onChange={(t) => setCode(t)}
              keyboardType="numeric"
              textContentType="oneTimeCode"
              onFocus={() => setFocus(null)}
              onSubmitEditing={() => setFocus("newPassword")}
            />

            <PasswordInputField
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              textContentType="newPassword"
              passwordRules="minlength: 6;"
              password
              focus={focus === "newPassword"}
              onFocus={() => setFocus(null)}
            />

            <Text style={{ color: 'black' }}>
              Password Requirement:
            </Text>
            <Text style={{ color: 'black' }}>
              - Minimum 6 characters
            </Text>


            {/* <Button
              title={"Update Password"}
              onPress={handlePasswordUpdate}
              style={tw("mt-4")}
              textStyle={tw("text-white")}
              isLoading={updatePasswordLoading}
            /> */}

            <Button
              title={"Update Password"}
              onPress={handleResetPasswordBtn}
              style={tw("mt-4")}
              textStyle={tw("text-white")}
              isLoading={passwordResetLoading}
            />
          </View>
        {/* </ScrollView> */}
        
        </KeyboardAwareScrollView>
      {/* </KeyboardAvoidingView> */} 
    </PageContainer>
    
  );
};

export default SettingsInfoScreen;
