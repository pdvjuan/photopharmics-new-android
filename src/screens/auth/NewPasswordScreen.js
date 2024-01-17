import React, { useState } from "react";
import { Alert } from "react-native";
import { InputField } from "../../base";
import Button from "../../base/Button";
import useForgotPasswordSubmitMutation from "../../api/cognito/mutations/useForgotPasswordSubmitMutation";
import AuthContainer from "./AuthContainer";
import { tw } from "tailwind";
import PasswordInputField from "../../base/PasswordInputField";

const ForgotScreen = ({ route }) => {
  const { email } = route.params;
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: forgotPasswordSubmit, isLoading } =
    useForgotPasswordSubmitMutation();

  const handleResetPasswordBtn = () => {
    if (!code) {
      Alert.alert("Please enter a valid confirmation code");
      return;
    } else if (!password) {
      Alert.alert("Please enter a new password");
    } else
      forgotPasswordSubmit({
        username: email,
        code: code,
        password: password,
      });
  };

  return (
    <AuthContainer
      headerText="Confirm code and reset password"
      footerText="Back to sign in"
      footerBtnText="Sign In"
      footerNav="Signin"
    >
      <InputField
        label={"Code"}
        value={code}
        onChange={(t) => setCode(t)}
        textContentType="oneTimeCode"
      />
      <PasswordInputField
        label="New Password"
        value={password}
        onChange={setPassword}
        keyboardType="numeric"
        textContentType="newPassword"
        passwordRules="minlength: 6;"
        password
      />
      <Button
        onPress={() => handleResetPasswordBtn()}
        title="Reset Password"
        textStyle={tw("text-white")}
      />
    </AuthContainer>
  );
};

export default ForgotScreen;
