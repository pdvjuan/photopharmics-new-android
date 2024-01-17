import { Alert } from "react-native";
import { useMutation } from "react-query";
import { Auth } from "@aws-amplify/auth";

const AmplifyUpdatePassword = async ({ oldPassword, newPassword }) => {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.changePassword(user, oldPassword, newPassword);
};

const useUpdatePasswordMutation = () => {
  return useMutation(AmplifyUpdatePassword, {
    onSuccess: () => Alert.alert("Password Updated"),
    onError: ({ message }) => Alert.alert("Update failed", message),
  });
};

export default useUpdatePasswordMutation;
