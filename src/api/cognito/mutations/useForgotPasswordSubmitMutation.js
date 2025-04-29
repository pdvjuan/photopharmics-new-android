import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";
import storage from "../../device/localStorage";

let pw;

const AmplifyForgotPasswordSubmit = async ({ username, code, password }) => {
  pw = password;
  await Auth.forgotPasswordSubmit(username, code, password);
};

const useForgotPasswordSubmitMutation = () => {
  return useMutation(AmplifyForgotPasswordSubmit, {
    onSuccess: () => {
      Alert.alert(
        "Your Password Has Been Reset",
        "Please log in with your new password"
      );
      storage.save({
        key: 'passwordSaved',
        data: pw
      });
      navigate("Signin");
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
