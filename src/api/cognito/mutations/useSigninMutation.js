import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useAppContext } from "../../../context/AppContext";
import { Auth } from "@aws-amplify/auth";
import { navigate } from "../../../helpers/navgationRef";

const AmplifySignIn = async ({ username, password }) => {
  const user = await Auth.signIn(username, password);
  return user;
};

const useSigninMutation = () => {
  const { dispatch } = useAppContext();
  return useMutation(AmplifySignIn, {
    onSuccess: (user) => {
      dispatch({ type: "SIGN_IN", payload: user?.attributes });
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
