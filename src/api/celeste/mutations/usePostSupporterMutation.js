import { Alert } from "react-native";
import { useMutation } from "react-query";
import getCelesteAPI from "../getCelesteAPI";
import { useQueryClient } from "react-query";
import { KEY } from "../queries/useSupportersQuery";
import { formatPhoneNumber } from "../../../helpers/FormatPhoneNumber";

const CelestePostSupporter = async ({ userId, supporter }) => {
  supporter.phone = formatPhoneNumber(supporter.phone);
  const api = await getCelesteAPI();
  const { data } = await api.post(`/supporter/${userId}`, supporter);
  return data;
};

const usePostSupporterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(CelestePostSupporter, {
    onSuccess: () => {
      Alert.alert(
        "Success!",
        "Your new supporter will receive a text message to confirm their support."
      );
      queryClient.invalidateQueries(KEY);
    },
    onError: ({ message }) =>
      Alert.alert("Invalid Phone number", "Please enter a valid phone number."),
  });
};

export default usePostSupporterMutation;
