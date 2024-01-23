import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import { signOut } from "@aws-amplify/auth";

const AmplifySignout = async () => {
  await signOut();
};

const useSignoutMutation = () => {
  const { dispatch } = useAppContext();
  return useMutation(AmplifySignout, {
    onSuccess: (data) => dispatch({ type: "SIGN_OUT", payload: data }),
    onError: ({ message }) => Alert.alert("Failed to sign out", message),
  });
};

export default useSignoutMutation;
