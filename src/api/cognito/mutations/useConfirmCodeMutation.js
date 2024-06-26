import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";
import storage from "../../device/localStorage";

const AmplifyConfirmCode = async ({ username, code }) => {
  await Auth.confirmSignUp(username, code);
};

const useConfirmCodeMutation = () => {
  return useMutation(AmplifyConfirmCode, {
    onSuccess: (data) => {
      Alert.alert("Success!", "Please sign in.");
      storage.save({
        key: 'signUpTrigger',
        data: false
      });  
      navigate("AutoSignin");
    },
    onError: ({ code }) => {
      code === "CodeMismatchException"
        ? Alert.alert("Code invalid", "Please try again.")
        : Alert.alert(
            "Code invalid",
            "Please enter a valid confirmation code."
          );
    },
  });
};

export default useConfirmCodeMutation;
