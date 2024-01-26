import { useQuery } from "react-query";
import getCelesteAPI from "../getCelesteAPI";

const GetSessions = async (userId) => {
  const api = await getCelesteAPI();
  console.log("GetSessions userID: " + userId);
  const { data: sessions } = await api.get(`/session/${userId}/all`);

  if(sessions == null){
    console.log("Nothing came in");
  } else {
    console.log("After getting sessions");
    //console.log('this is the sessions', sessions);
  }
  
  return sessions;
};

export const KEY = "CELESTE_USER_SESSIONS";
const useSessionsQuery = (id) =>
{
  console.log("useSessionsQuery userID: " + id);
  return useQuery([KEY, id], () => GetSessions(id), {
    staleTime: 1 * 60 * 1000,
  });
}
export default useSessionsQuery;
