import { useQuery } from "react-query";
import getCelesteAPI from "../getCelesteAPI";

const GetSupporter = async ({ userId, supporterId }) => {
  const api = await getCelesteAPI();
  const { data: supporter } = await api.get(
    `/supporter/${userId}/${supporterId}`
  );
  return supporter;
};

const useSupporterQuery = (userId, supporterId) =>
  useQuery(
    ["CELESTE_USER_SUPPORTER", userId, supporterId],
    () => GetSupporter({ userId, supporterId }),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );

export default useSupporterQuery;
