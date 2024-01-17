import { Alert } from "react-native";
import { useMutation } from "react-query";
import getCelesteAPI from "../getCelesteAPI";
import { useQueryClient } from "react-query";
import { KEY } from "../queries/useSupportersQuery";

const CelesteDeleteSupporter = async ({ userId, supporterId }) => {
  const api = await getCelesteAPI();
  await api.delete(`/supporter/${userId}/${supporterId}`);
};

const useDeleteSupporterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(CelesteDeleteSupporter, {
    onSuccess: () => {
      Alert.alert("Supporter deleted");
      queryClient.invalidateQueries(KEY);
    },
    onError: ({ message }) =>
      Alert.alert("Failed to update supporter", message),
  });
};

export default useDeleteSupporterMutation;
