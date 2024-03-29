import React, { useState } from "react";
import { Alert, Text } from "react-native";
import { Button, InputField } from "../../base";
import useSignInMutation from "../../api/cognito/mutations/useSigninMutation";
import AuthContainer from "./AuthContainer";
import { tw } from "tailwind";
import { useAppContext } from "../../context/AppContext";
import PasswordInputField from "../../base/PasswordInputField";

const SigninScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(null);
  const { mutate: signIn, isLoading } = useSignInMutation();
  const { dispatch } = useAppContext();

  const handleSigninBtn = () => {
    if (!username) {
      Alert.alert("Please enter your username");
    } else if (!password) {
      Alert.alert("Please enter your password");
    } else signIn({ username, password });
  };

  return (
    <AuthContainer
      headerText="Please sign in"
      footerText="Don't have an account?"
      footerBtnText="Sign Up"
      footerNav="Signup"
    >
      <InputField
        label="Username (email)"
        value={username}
        onChange={setUsername}
        textContentType="username"
        onFocus={() => setFocus(null)}
        onSubmitEditing={() => setFocus("password")}
        blurOnSubmit={false}
      />
      <PasswordInputField
        label="Password"
        value={password}
        onChange={setPassword}
        password
        focus={focus === "password"}
      />
      <Text
        style={tw("text-center py-2 mt-4 text-celeste-blue")}
        onPress={() => navigation.navigate("Forgot")}
      >
        Forgot Password?
      </Text>
      <Button
        title={"Sign In"}
        style={tw("mt-4")}
        textStyle={tw("text-white")}
        onPress={() => {
          dispatch({ type: "FIRST_TIME", payload: true });
          handleSigninBtn();
        }}
        isLoading={isLoading}
      />
    </AuthContainer>
  );
};

export default SigninScreen;
