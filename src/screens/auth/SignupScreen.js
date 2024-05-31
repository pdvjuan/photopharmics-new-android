import React, { useState, useEffect } from "react";
import { tw } from "tailwind";
import { Text, Alert} from "react-native";
import { Button, InputField} from "../../base"; 
import useSignupMutation from "../../api/cognito/mutations/useSignupMutation";
import AuthContainer from "./AuthContainer";
import { requestBluetoothPermission } from "../../helpers/bluetooth/RequestBluetoothPermission";
//import PasswordInputField from "../../base/PasswordInputField";


const INITIAL_ERRORS = {
  messages: [],
  email: false,
  givenName: false,
  familyName: false,
  gender: false,
  password: false,
};

const SignupScreen = () => {
  const lengthPW = 12;
  const [email, setEmail] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  //const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [focus, setFocus] = useState(null);
  const { mutate: signUp, isLoading } = useSignupMutation();
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#';
  let password = '';
  for (let i = 0, n = charset.length; i < lengthPW; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  useEffect(() => {
    // Directly call the imported function
    const checkPermissions = async () => {
      const hasPermission = await requestBluetoothPermission();
      if (!hasPermission) {
        
      }
    };

    checkPermissions();

  }, []);

  const handleSignUpBtn = () => {
    if (hasErrors()) return;

    if (!validateEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    } 

    // if (!validatePhoneNumber(phoneNumber)) {
    //   Alert.alert("Invalid Phone Number", "Please enter a valid 10 digit phone number.");
    //   return;
    // } 
   
    signUp({
      username: email,
      password,
      attributes: {
        given_name: givenName,
        family_name: familyName,
        // phone_number: phoneNumber,
        'custom:expo_token': "token"
      },
    });
    
  };

  

  // Email validation function
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  // // Phone number validation function
  // const validatePhoneNumber = (phoneNumber) => {
  //   const re = /^\d{10}$/;
  //   return re.test(String(phoneNumber));
  // };

  const hasErrors = () => {
     // Reset errors state except for the messages array
     const _errors = { ...INITIAL_ERRORS, messages: [] };

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
    // if (!phoneNumber) {
    //   _errors.messages.push("Phone Number is required");
    //   _errors.phoneNumber = true;
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
      footerText="Already have an account?"
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
        label="First name (Optional)"
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
        label="Last name (Optional)"
        value={familyName}
        onChange={setFamilyName}
        error={errors.familyName}
        textContentType="familyName"
        focus={focus === "familyName"}
        onSubmitEditing={() => setFocus("phoneNumber")}
        onFocus={() => setFocus(null)}
      />

      {/* <InputField
        label="Phone number"
        value={phoneNumber}
        onChange={setPhoneNumber}
        error={errors.phoneNumber}
        textContentType="telephoneNumber"
        focus={focus === "phoneNumber"}
        onSubmitEditing={() => setFocus("password")}
        onFocus={() => setFocus(null)}
        keyboardType="phone-pad"
      /> */}
      {/* <Text style={{ color: 'black' }}>
        Phone number requirement:
      </Text> */}
      {/* <Text style={{ color: 'black' }}>
        - 10 digit number
      </Text> */}

      {/* <PasswordInputField
        label="Password"
        value={password}
        focus={ focus === "password"}
        onChange={setPassword}
        keyboardType="numeric"
        textContentType="newPassword"
        error={errors.password}
        passwordRules="minlength: 6;"
        password
      /> 

      <Text style={{ color: 'black' }}>
        Password requirement:
      </Text>
      <Text style={{ color: 'black' }}>
        - Minimum 6 characters
      </Text> */}

      {/* <ToggleButtons
        label="Gender (Optional)"
        option1="Male"
        option2="Female"
        value={gender}
        onPress={setGender}
        error={errors.gender}
      /> */}

      <Button
        title={"Sign Up"}
        onPress={handleSignUpBtn}
        style={tw("mt-4")}
        textStyle={tw("text-white")}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </AuthContainer>
  );
};

export default SignupScreen;
