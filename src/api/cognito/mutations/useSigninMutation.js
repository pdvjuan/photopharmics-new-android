import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import { signIn, currentAuthenticatedUser,fetchUserAttributes } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";

const AmplifySignIn = async ({ username, password }) => {
  const { isSignedIn, nextStep } = await signIn({ username, password });
  if (isSignedIn) {
    // Fetching the current authenticated user's data
    const user = currentAuthenticatedUser;
    const attributes = fetchUserAttributes(user);
    return attributes
  } else {
    // Handle additional steps like MFA or confirmation
  }
};

const useSigninMutation = () => {
  const { dispatch } = useAppContext();
  return useMutation(AmplifySignIn, {
    onSuccess: (attributes) => {
      // Dispatching user data to the global state
      dispatch({ type: "SIGN_IN", payload: attributes });
    },
    onError: onError,
  });
};


const onError = (error) => {
  const { code, message } = error;
  if (code === "UserNotConfirmedException") {
    Alert.alert("Account is not confirmed");
    navigate("ConfirmCode");
  } else if (code === "UserNotFoundException") {
    Alert.alert(
      "This username does not exist.",
      "Please enter a different username."
    );
  } else if (code === "NotAuthorizedException") {
    Alert.alert("Incorrect password");
  } else Alert.alert("Failed to sign in", message);
};

export default useSigninMutation;
