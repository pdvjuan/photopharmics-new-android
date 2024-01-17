import { Alert } from "react-native";
import { useMutation } from "react-query";
import getCelesteAPI from "../getCelesteAPI";
import { useQueryClient } from "react-query";
import { KEY } from "../queries/useSupportersQuery";

const CelesteUpdateSupporter = async ({ userId, supporterId, supporter }) => {
  const api = await getCelesteAPI();
  return await api.put(`/supporter/${userId}/${supporterId}`, supporter);
};

const useUpdateSupporterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(CelesteUpdateSupporter, {
    onSuccess: () => {
      Alert.alert("Supporter Updated");
      queryClient.invalidateQueries(KEY);
    },
    onError: ({ message }) =>
      Alert.alert("Failed to update supporter", "Invalid name."),
  });
};

export default useUpdateSupporterMutation;
