import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";

const AmplifyResendCode = async ({ username }) => {
  await Auth.resendSignUp(username);
};

const useResendCodeMutation = () => {
  return useMutation(AmplifyResendCode, {
    onSuccess: (data) => {
      Alert.alert("Sent", "Please allow up to 5 minutes to receive the code");
    },
    onError: ({ message }) => Alert.alert("Failed to resend code", message),
  });
};

export default useResendCodeMutation;
