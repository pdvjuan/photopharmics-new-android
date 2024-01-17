import { useQuery } from "react-query";
import getCelesteAPI from "../getCelesteAPI";

const GetSessions = async ({ userId, sessionId }) => {
  console.log('this is user id', userId)
  const api = await getCelesteAPI();
  console.log('what is this api', api)
  const { data: sessions } = await api.get(`/session/${userId}/${sessionId}`);
  return sessions;
};

const useSessionQuery = (userId, sessionId) =>
  useQuery(
    ["CELESTE_SESSION", userId, sessionId],
    () => GetSessions({ userId, sessionId }),
    {
      staleTime: 0.5 * 60 * 1000,
    }
  );
console.log('this is sessionid',sessionId)
export default useSessionQuery;

