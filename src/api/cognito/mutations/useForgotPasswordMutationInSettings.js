import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";

const AmplifyForgotPassword = async ({ username }) => {
  await Auth.forgotPassword(username);
  return username;
  // await Auth.changePassword(user, oldPassword, newPassword);
};

const useForgotPasswordMutation = (email) => {
  return useMutation(AmplifyForgotPassword, {
    onSuccess: () => {
      Alert.alert(
        "Code Sent",
        `A new code has been sent to ${email}.`
      );
    },
    onError: ({ code, message }) => {
      console.log("Code", code);
      console.log("message", message);
      switch (code) {
        case "UserNotFoundException":
            Alert.alert("Invalid Email", "Code not sent.");
            break;
        case "InvalidParameterException":
            Alert.alert("Invalid Email", "An email cannot have empty spaces. Code not sent.");
            break;
        default:
            Alert.alert("Failed To Send Code", message);
            break;
      };
    },
  });
};

export default useForgotPasswordMutation;
