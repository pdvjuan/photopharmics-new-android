import React, { useState, useEffect } from "react";
import { Text, Alert } from "react-native";
import { tw } from "../../../tailwind";
import { Button, InputField } from "../../base";
import useConfirmCodeMutation from "../../api/cognito/mutations/useConfirmCodeMutation";
import useResendCodeMutation from "../../api/cognito/mutations/useResendCodeMutation";
import AuthContainer from "./AuthContainer";
import storage from "../../api/device/localStorage";

const SigninScreen = ({ route }) => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState(route?.params?.username);
  const { mutate: confirmCode, isLoading: l1 } = useConfirmCodeMutation();
  const { mutate: resendCode, isLoading: l2 } = useResendCodeMutation();
  const isLoading = l1 || l2;


 const handleConfirmButton = () => {
    confirmCode({ username, code});
  };

  const handleResendButton = () => {
    Alert.alert("Resend verification code?", "", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Resend",
        onPress: () => resendCode({ username }),
      },
    ]);
  };

  if(!route?.params?.username){
    storage.load({
      key: 'usernameSaved'
    }).then(usernameSaved => {
      console.log('Loaded username:', usernameSaved);
      setUsername(usernameSaved);
    }).catch(err => {
      console.warn('Failed to load username:', err.message);
    });
  }
 
  return (
    <AuthContainer
      headerText="Enter the 6-digit code sent to your email."
      footerText="Back to Sign In"
      footerBtnText="Sign In"
      footerNav="Signin"
    >
      {!route?.params?.username && (
        <InputField
          label="Email"
          value={username}
          onChange={setUsername}
          textContentType="emailAddress"
        />
      )}
      <InputField
        label="Confirmation Code"
        value={code}
        onChange={setCode}
        textContentType="oneTimeCode"
        keyboardType="numeric"
      />
      <Button
        title={"Confirm Code"}
        style={tw("mt-4")}
        textStyle={tw("text-white")}
        onPress={handleConfirmButton}
        isLoading={isLoading}
      />
      <Text
        style={tw("text-center py-2 mt-4 text-celeste-blue")}
        onPress={handleResendButton}
      >
        Send Me Another Code
      </Text>
    </AuthContainer>
  );
};

export default SigninScreen;
