import { useQuery } from "react-query";
import getCelesteAPI from "../getCelesteAPI";

const GetSupporters = async (userId) => {
  const api = await getCelesteAPI();
  const { data: supporters } = await api.get(`/supporter/${userId}`);
  return supporters;
};

export const KEY = "CELESTE_USER_SUPPORTERS";
const useSupportersQuery = (userId) =>
  useQuery([KEY, userId], () => GetSupporters(userId), {
    staleTime: 0,
  });

export default useSupportersQuery;
