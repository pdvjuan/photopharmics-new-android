import moment from "moment";

const GetDatesWithSessions = (sessions) => {
  let datesWithSessions = {};

  sessions.forEach((session) => {
    if (!datesWithSessions[session.sessionDate]) {
      datesWithSessions[session.sessionDate] = true;
    }
  });

  return datesWithSessions;
};

export default GetDatesWithSessions;
