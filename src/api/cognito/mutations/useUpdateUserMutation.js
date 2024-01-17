import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import { Auth } from "@aws-amplify/auth";

export const AmplifyUpdateUser = async (newAttributes) => {
  const user = await Auth.currentAuthenticatedUser();
  await Auth.updateUserAttributes(user, newAttributes);
  const { attributes } = await Auth.currentAuthenticatedUser();
  return attributes;
};

const useUpdateUserMutation = () => {
  const { dispatch } = useAppContext();
  return useMutation(AmplifyUpdateUser, {
    onSuccess: (attributes) => {
      dispatch({ type: "SIGN_IN", payload: attributes });
      Alert.alert("Updated");
    },
    onError: () =>
      Alert.alert("Error", "Please contact us if this problem persists."),
  });
};

export default useUpdateUserMutation;
