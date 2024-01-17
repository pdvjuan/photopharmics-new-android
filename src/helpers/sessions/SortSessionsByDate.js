const SortSessionsByDate = (sessions) => {
  if (sessions.length < 1) return sessions;
  const sortedSessions = sessions.sort((a, b) => a.sessionDate - b.sessionDate);
  return sortedSessions;
};

export default SortSessionsByDate;
