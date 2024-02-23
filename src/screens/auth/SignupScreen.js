import React, { useState } from "react";
import { tw } from "tailwind";
import { View,Text, TextInput,TouchableOpacity,StyleSheet} from "react-native";
import { Button, InputField, ToggleButtons } from "../../base"; 
import { EyeIcon,EyeOffIcon } from "react-native-heroicons/outline";// Import eye icons from a suitable library
import useSignupMutation from "../../api/cognito/mutations/useSignupMutation";
import AuthContainer from "./AuthContainer";
import PasswordInputField from "../../base/PasswordInputField";
import * as Notifications from "expo-notifications";


const INITIAL_ERRORS = {
  messages: [],
  email: false,
  givenName: false,
  familyName: false,
  gender: false,
  password: false,
};

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [focus, setFocus] = useState(null);
  const { mutate: signUp, isLoading } = useSignupMutation();

  const handleSignUpBtn = () => {
    if (hasErrors()) return;
    signUp({
      username: email,
      password,
      attributes: {
        given_name: givenName,
        family_name: familyName,
        phone_number: phoneNumber,
        'custom:expo_token': "token"
      },
    });
  };

  const styles = StyleSheet.create({
    input: {
      height: 50, // Set the height of the input
      borderWidth: 1, // Width of the border around the input
      borderColor: '#000', // Color of the border, adjust as needed
      padding: 10, // Padding inside the input
      fontSize: 16, // Adjust the font size as needed
      borderRadius: 5, // Radius of the corner of the border
    },
    label: {
      fontSize: 16, // Set the size of the label text
      color: '#000', // Color of the label text, adjust as needed
      marginBottom: 5, // Space between the label and the input field
    },
    container: {
      marginTop:10,
      marginBottom: 10
    },
  });

 // State variable to track password visibility 
 const [showPassword, setShowPassword] = useState(false); 


  const hasErrors = () => {
    const _errors = { ...INITIAL_ERRORS };
    if (!email) {
      _errors.messages.push("Email is required");
      _errors.email = true;
    }
    // if (!givenName) {
    //   _errors.messages.push("First Name is required");
    //   _errors.givenName = true;
    // }
    // if (!familyName) {
    //   _errors.messages.push("Last Name is required");
    //   _errors.familyName = true;
    //}
    if (!phoneNumber) {
      _errors.messages.push("Phone Number is required");
      _errors.phoneNumber = true;
    }
    // if (!gender) {
    //   _errors.messages.push("Gender is required");
    //   _errors.gender = true;
    // }
    if (!password) {
      _errors.messages.push("Password is required");
      _errors.password = true;
    }


    setErrors(_errors);
    if (_errors.messages.length > 0) return true;
    return false;
  };

  return (
    <AuthContainer
      headerText="Please sign up"
      footerText="Already have an account"
      footerBtnText="Sign In"
      footerNav="Signin"
    >
      <InputField
        label="Email"
        value={email}
        onChange={setEmail}
        textContentType="emailAddress"
        error={errors.email}
        onFocus={() => setFocus(null)}
        onSubmitEditing={() => setFocus("givenName")}
        blurOnSubmit={false}
        keyboardType="email-address"
      />
      <InputField
        label="First Name (Optional)"
        value={givenName}
        onChange={setGivenName}
        error={errors.givenName}
        textContentType="givenName"
        focus={focus === "givenName"}
        onFocus={() => setFocus(null)}
        onSubmitEditing={() => setFocus("familyName")}
        blurOnSubmit={false}
      />
      <InputField
        label="Last Name (Optional)"
        value={familyName}
        onChange={setFamilyName}
        error={errors.familyName}
        textContentType="familyName"
        focus={focus === "familyName"}
        onSubmitEditing={() => setFocus("phoneNumber")}
        onFocus={() => setFocus(null)}
      />
      <InputField
        label="Phone Number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        error={errors.phoneNumber}
        textContentType="telephoneNumber"
        focus={focus === "phoneNumber"}
        onFocus={() => setFocus(null)}
        keyboardType="phone-pad"
      />

      {/* <ToggleButtons
        label="Gender (Optional)"
        option1="Male"
        option2="Female"
        value={gender}
        onPress={setGender}
        error={errors.gender}
      /> */}

      <PasswordInputField
        label="New Password"
        value={password}
        onChange={setPassword}
        keyboardType="numeric"
        textContentType="newPassword"
        error={errors.password}
        passwordRules="minlength: 6;"
        password
      /> 

<Text style={{ color: 'black' }}>
    Password Requirements:
  </Text>
  <Text style={{ color: 'black' }}>
    - Minimum 6 Digit Numeric Pin
  </Text>



      <Button
        title={"Sign Up"}
        onPress={handleSignUpBtn}
        style={tw("mt-4")}
        textStyle={tw("text-white")}
        isLoading={isLoading}
      />
    </AuthContainer>
  );
};

export default SignupScreen;
