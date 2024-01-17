import { Alert } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import getCelesteAPI from "../getCelesteAPI";
import { KEY as SESSIONS_KEY } from "../queries/useSessionsQuery";

const UploadSessions = async ({ deviceSessions, cloudSessions, userId }) => {
  const api = await getCelesteAPI();

  const allDates = new Map();
  const newSessions = [];

  cloudSessions.forEach((session) => {
    const date = `${session.sessionDate}`;
    allDates.set(date, session);
  });

  deviceSessions.forEach((session) => {
    const date = `${session.sessionDate}`;
    if (!allDates.has(date)) {
      allDates.set(date, session);
      newSessions.push(session);
    } else {
      const oldSession = allDates.get(date);
      if (oldSession.entries.length !== session.entries.length) {
        oldSession.entries = session.entries;
        allDates.set(date, oldSession);
        newSessions.push(oldSession);
      }
    }
  });

  for (let i = 0; i < newSessions.length; i++) {
    if (newSessions[i].sessionId) {
      await api.put(
        `/session/${userId}/${newSessions[i].sessionId}`,
        newSessions[i]
      );
    } else {
      await api.post(`/session/${userId}`, newSessions[i]);
    }
  }

  return true;
};

const useUploadSessionsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(UploadSessions, {
    onSuccess: () => {
      queryClient.invalidateQueries(SESSIONS_KEY);
    },
  });
};

export default useUploadSessionsMutation;
