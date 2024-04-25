import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";

const AmplifyForgotPasswordSubmit = async ({ username, code, password }) => {
  await Auth.forgotPasswordSubmit(username, code, password);
};

const useForgotPasswordSubmitMutation = () => {
  return useMutation(AmplifyForgotPasswordSubmit, {
    onSuccess: () => {
      Alert.alert(
        "Your Password Has Been Reset", "Thank you!"
      );
    },
    onError: ({ code, message }) => {
      console.log("Code", code);
      console.log("message", message);
      switch (code) {
        case "CodeMismatchException":
            Alert.alert("Invalid Code", "Please enter a valid code.");
            break;
        case "InvalidParameterException":
            Alert.alert("Invalid Code", "Code cannot have any spaces. Please enter a valid code.");
            break;
        default:
            Alert.alert("Failed To Reset Password", message);
            break;
    };
    },
  });
};

export default useForgotPasswordSubmitMutation;
