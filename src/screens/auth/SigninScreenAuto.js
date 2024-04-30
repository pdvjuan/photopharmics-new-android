import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Platform,
  TextInput
} from "react-native";
import { tw, getColor } from "../../../tailwind";
import useSignInMutation from "../../api/cognito/mutations/useSigninMutation";
import { useAppContext } from "../../context/AppContext";
import storage from "../../api/device/localStorage";
import { navigate } from "../../helpers/navgationRef";

const AutoSignInScreen = ( ) => {
  const { mutate: signIn, isLoadingSignIn } = useSignInMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // State to control loading indicator
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
      loadCredentials();
  }, []);

  const handleSignInNew = useCallback(() => {
    console.log(username,password);
    signIn({username, password});
  }, [username, password]); 

  return (
    <View style={tw("flex-1 flex-col justify-center items-center bg-white")}>
      <Image
        style={[tw("w-3/4 h-64"), styles.image]}
        source={require("../../../assets/logo.png")}
      />

    <Text style={tw("text-xl justify-center text-celeste-darkgray pb-2")}>
        {"Welcome, registration has been complete."}
      </Text>
      <TextInput
        style={styles.input}
        onChange={(text) => setUsername(text)}
        value={username}
        placeholder="Username"
        textContentType="username"
        autoCapitalize="none"
        editable={false}
      />
      <TextInput
        style={styles.input}
        onChange={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        textContentType="password"
        autoCapitalize="none"
        editable={false}
      />
      <Text style={tw("text-xl text-celeste-darkgray pb-2")}>
        {isLoading ? "Logging you in..." : "Press button to log in"}
      </Text>
      {isLoading && (
        <ActivityIndicator
          size={Platform.OS === "ios" ? "small" : 30}
          color={getColor("gray-500")}
        />
      )}
      {!isLoading && (
        <Button
          title="Log In"
          onPress={() => {
            dispatch({ type: "FIRST_TIME", payload: true });
            setIsLoading(true);
            handleSignInNew();
          }}
          disabled={!username || !password}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
  },
  input: {
    width: '80%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
  },
});

export default AutoSignInScreen;
