import { useQuery } from "react-query";
import { Auth } from "aws-amplify";
import { useAppContext } from "../../../context/AppContext";

export const GetCurrentUser = async (dispatch) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    dispatch({ type: "SIGN_IN", payload: user?.attributes });
    return true;
  } catch {
    dispatch({ type: "SIGN_OUT" });
    return false;
  }
};

const useCurrentUserQuery = () => {
  const { dispatch } = useAppContext();
  return useQuery("CELESTE_CURRENT_USER", () => GetCurrentUser(dispatch), {
    staleTime: Infinity,
  });
};

export default useCurrentUserQuery;
