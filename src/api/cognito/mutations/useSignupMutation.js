import { Auth } from "@aws-amplify/auth";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { navigate } from "../../../helpers/navgationRef";
import storage from "../../device/localStorage";

let pw;

const AmplifySignUp = async (config) => {
  pw = config?.password;
  // config.attributes.phone_number = formatPhoneNumber(
  //   config?.attributes?.phone_number
  // );
  return await Auth.signUp(config);
};

const useSignupMutation = () => {
  return useMutation(AmplifySignUp, {
    onSuccess: onSuccess,
    onError: ({code, message }) => Alert.alert(code, message),
  });
};

const onSuccess = (response) => {
  if (response.userConfirmed) {
    Alert.alert("Sign Up Successful. Please Login");
    navigate("Signin");
  } else {
    storage.save({
      key: 'usernameSaved',
      data: response?.user?.username
    });
    storage.save({
      key: 'passwordSaved',
      data: pw
    });
    storage.save({
      key: 'signUpTrigger',
      data: true
    });

    console.log("username: ", response?.user?.username);
    console.log("pw: ", pw);

    navigate("ConfirmCode", { username: response?.user?.username, password: pw });
  }
};

const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  if (cleaned.length !== 10)
    throw Error("Invalid phone number. Please enter only 10 digit phone number.");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = "+1";
    return [intlCode, match[1], match[2], match[3]].join("");
  }
  return null;
};

export default useSignupMutation;
