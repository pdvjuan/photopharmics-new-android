import moment from "moment";
import SortSessionsByDate from "./SortSessionsByDate";

const GetCurrentStreak = (sessions) => {
  let streak = 0;
  const date = new Date();

  const sortedSessions = SortSessionsByDate(sessions);

  sortedSessions.some((el) => {
    if (el.sessionDate === moment(date).format("YYYY-MM-DD")) {
      streak += 1;
      date.setDate(date.getDate() - 1);
    } else {
      if (streak) {
        return true;
      }
    }
  });

  return streak;
};

export default GetCurrentStreak;
