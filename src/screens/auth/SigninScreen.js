import React, { useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import { Button, InputField } from "../../base";
import useSignInMutation from "../../api/cognito/mutations/useSigninMutation";
import AuthContainer from "./AuthContainer";
import { tw } from "../../../tailwind";
import { useAppContext } from "../../context/AppContext";
import PasswordInputField from "../../base/PasswordInputField";
import storage from "../../api/device/localStorage";

const SigninScreen = ({ navigation}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focus, setFocus] = useState(null);
  const { mutate: signIn, isLoading } = useSignInMutation();
  const { dispatch } = useAppContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCredentials() {
      try {
        setLoading(true);
        const usernameSaved = await storage.load({ key: 'usernameSaved' });
        const passwordSaved = await storage.load({ key: 'passwordSaved' });
        if (usernameSaved && passwordSaved) {
          setUsername(usernameSaved);
          setPassword(passwordSaved);
        }
      } catch (err) {
        console.warn('Failed to load credentials:', err.message);
      } finally {
        setLoading(false);
      }
    }

    // Only execute if username and password are not already set
    if (!username && !password) {
      loadCredentials();
    }
  }, [username, password]);

  // username validation function
  const validateUsername = (username) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(username).toLowerCase());
  };

  const handleSigninBtn = () => {
    if (!validateUsername(username)) {
      Alert.alert("Error","Please enter a valid email.");
    } else if (!password) {
      Alert.alert("Error","Please enter a valid password");
    } else signIn({ username, password});
  };

  return (
    <AuthContainer
      headerText="Please sign in"
      footerText="Don't have an account?"
      footerBtnText="Sign Up"
      footerNav="Signup"
    >
      <InputField
        label="Email"
        value={username}
        onChange={(text) => setUsername(text)}
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
