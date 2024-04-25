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
    onError:(error) => {
      const { code, message } = error; 
      switch (code) {
        case "NotAuthorizedException":
          Alert.alert("Unable to update", "Old password is incorrect.");
          break;
        case "InvalidParameterException":
          Alert.alert("Unable to update", "Please make sure passwords do not contain any spaces.");
          break;
        default:
          Alert.alert("Update failed", message); // Use the generic message for other errors
      }
    },
  });
};

export default useUpdatePasswordMutation;
