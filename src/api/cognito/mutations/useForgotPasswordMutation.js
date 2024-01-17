import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";

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
        "A new code has been sent to your mobile phone."
      );
      navigate("NewPassword", { email });
    },
    onError: ({ code, message }) => {
      code === "UserNotFoundException"
        ? Alert.alert("Invalid Email", "Code not sent.")
        : Alert.alert("Failed To Send Code", message);
    },
  });
};

export default useForgotPasswordMutation;
