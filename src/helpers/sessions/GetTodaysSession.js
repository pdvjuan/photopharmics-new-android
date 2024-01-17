import moment from "moment";
import SortSessionsByDate from "./SortSessionsByDate";
const TODAY = moment().format("YYYY-MM-DD");

const GetTodaysSession = (sessions) => {
  if (sessions.length < 1) return null;

  const mostRecentSession = SortSessionsByDate(sessions)[0];

  if (TODAY === mostRecentSession.sessionDate) {
    return mostRecentSession;
  } else {
    return null;
  }
};

export default GetTodaysSession;
