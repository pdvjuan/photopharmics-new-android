import React, { useState } from "react";
import { Alert } from "react-native";
import { InputField } from "../../base";
import Button from "../../base/Button";
import useForgotPasswordMutation from "../../api/cognito/mutations/useForgotPasswordMutation";
import AuthContainer from "./AuthContainer";
import { tw } from "../../../tailwind";

const ForgotScreen = () => {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, isLoading } =
    useForgotPasswordMutation(email);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };
  const handleForgotPassword = () => {
    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    forgotPassword({ username: email });
  };

  return (
    <AuthContainer
      headerText=""
      footerText="Back to sign in"
      footerBtnText="Sign In"
      footerNav="Signin"
    >
      <InputField
        label={"Email"}
        value={email}
        onChange={(text) => setEmail(text)}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="john.doe@example.com"
        disabled={isLoading}
      />
      <Button
        onPress={handleForgotPassword}
        title="Reset Password"
        isLoading={isLoading}
        textStyle={tw("text-white")}
      />
    </AuthContainer>
  );
};

export default ForgotScreen;
