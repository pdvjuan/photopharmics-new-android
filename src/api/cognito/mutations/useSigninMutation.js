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
  switch (code) {
    case "UserNotConfirmedException":
      Alert.alert("Account is not confirmed", "Please contact support.");
      navigate("ConfirmCode");
      break;
    case "UserNotFoundException":
      Alert.alert("This email does not exist.", "Please enter a different email.");
      break;
    case "NotAuthorizedException":
      Alert.alert("Failed to sign in", "Incorrect password or email was not verified");
      break;
    case "InvalidParameterException":
      Alert.alert("Invalid Email", "An email cannot have empty spaces. Please enter a different email.");
      break;
    default:
      Alert.alert("Failed to sign in", message);
  }
};

export default useSigninMutation;