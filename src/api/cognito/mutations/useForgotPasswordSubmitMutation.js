import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";

const AmplifyForgotPasswordSubmit = async ({ username, code, password }) => {
  await Auth.forgotPasswordSubmit(username, code, password);
};

const useForgotPasswordSubmitMutation = () => {
  return useMutation(AmplifyForgotPasswordSubmit, {
    onSuccess: () => {
      Alert.alert(
        "Your Password Has Been Reset",
        "Please log in with your new password"
      );
      navigate("Signin");
    },
    onError: ({ code, message }) => {
      code === "CodeMismatchException"
        ? Alert.alert("Invalid Code", "Please enter a valid code.")
        : Alert.alert("Failed To Reset Password", message);
    },
  });
};

export default useForgotPasswordSubmitMutation;
