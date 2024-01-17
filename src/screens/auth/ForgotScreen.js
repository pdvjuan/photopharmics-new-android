import React, { useState } from "react";
import { InputField } from "../../base";
import Button from "../../base/Button";
import useForgotPasswordMutation from "../../api/cognito/mutations/useForgotPasswordMutation";
import AuthContainer from "./AuthContainer";
import { tw } from "tailwind";

const ForgotScreen = () => {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, isLoading } =
    useForgotPasswordMutation(email);

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
        onChange={setEmail}
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="john.doe@example.com"
        disabled={isLoading}
      />
      <Button
        onPress={() => forgotPassword({ username: email })}
        title="Reset Password"
        isLoading={isLoading}
        textStyle={tw("text-white")}
      />
    </AuthContainer>
  );
};

export default ForgotScreen;
