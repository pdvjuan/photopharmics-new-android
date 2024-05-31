import moment from "moment";
import 'moment-timezone';
import DeviceInfo from "react-native-device-info";

const LogsToSessions = (logs) => {
  let userTimeZone = null;
  userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log("user time zone", userTimeZone);
 

  /*************************
   * RAW LOGS TO DIRTY LOGS
   ************************/
  const array = logs.split("\r\n\r\n");
  //in the first element of the array, "Option:\r\n" is included, this has to be removed.
  array[0] = array[0].replace(/Option:\s\r\n/i, "");

  let dirtyLogs = array.map((line) => {
    const _line = line.trim().split(" ");

    const device = _line[2];
    const sessionDate = _line[3];
    const sessionTime = _line[4];
    const action = _line[5];
    let log = _line.join(",");

    if (log.includes("Download,Complete")) {
      log = log.replace(/Download,Complete/, "").trim();
    }

     //console.info(`${device}: ${sessionDate} ${sessionTime} ${action}`);
    if (device && sessionDate && sessionTime && action && action != "Cal") {
      return {
        device,
        sessionDate,
        sessionTime,
        action,
        log,
      };
    }
  });

  /*************************
   * DIRTY LOGS TO SESSIONS
   ************************/
  let cleanLogs = new Map();
  dirtyLogs.forEach((el) => {
    if (!el) return;
    const key = `${el.sessionDate} ${el.sessionTime} ${el.action}`;
    //if the key is not present in the map.
    if (!cleanLogs.has(key)) {
      cleanLogs.set(key, el);
    }
  });

  //go through and remove remove extra 'off' logs.
  let on = null;
  for (const [key, value] of cleanLogs) {
    if (!on && key.includes("On")) {
      on = key;
    } else if (on && key.includes("Off")) {
      on = null;
    } else if (on && key.includes("On")) {
      //use case of device is on and then it is unplugged. No off would be logged.
      cleanLogs.delete(on);
      on = key;
    } else {
      //remove second of two off's, this happens when the user pauses and then turns off device.
      cleanLogs.delete(key);
    }
  }

  cleanLogs = [...cleanLogs.values()];


  /*************************
   * CLEAN LOGS TO SESSIONS
   ************************/
  let sessions = new Map();
  on = null;
  let off = null;
  cleanLogs.forEach((val) => {
    console.log(val);
    if (val.action == "On") {
      on = val;
    } else if (on && val.action.includes("Off")) {
      off = val;
    }

    if (on && off) {

      const cutOffDate = new Date('2023-10-01');

      const comparisonStartDate = new Date(on.sessionDate);
      const comparisonEndDate = new Date(on.sessionDate);
      console.log("input start, ",`${on.sessionDate} ${on.sessionTime}`);

      let timeStart = null;
      let testStart = null;
      let timeEnd = null;
      let duration = null;
      let startTimeString = null;
      let endTimeString = null;

      function convertToUserTimeZone(sessionDate, sessionTime, userTimeZone) {

        // Parse the session date and time in Mountain Time (MT)
        const mtDateTime = `${sessionDate}T${sessionTime}`;
        const mtMoment = moment.tz(mtDateTime, "America/Denver");
        console.log("Mountain Time (MT):", mtMoment.format());

        // Use moment-timezone to convert the Mountain Time date to the user's time zone
        const convertedDate = mtMoment.clone().tz(userTimeZone);
        console.log("User Time Zone:", userTimeZone);
        console.log("Converted Time:", convertedDate.format());

        return convertedDate;
      }

    if (comparisonStartDate > cutOffDate) {
        timeStart = convertToUserTimeZone(on.sessionDate, on.sessionTime, userTimeZone);
        //console.log("Start time:", timeStart);
        startTimeString = moment(timeStart).format("HH:mm:ss");
        console.log("filter", startTimeString);
    } else {
        timeStart = moment(`${on.sessionDate} ${on.sessionTime}`);
        startTimeString = moment(timeStart).format("HH:mm:ss");
        //console.log("Start time (old method):", timeStart.format("HH:mm:ss"));
    }
    
    if (comparisonEndDate > cutOffDate) {
        timeEnd = convertToUserTimeZone(off.sessionDate, off.sessionTime, userTimeZone);
        endTimeString =  moment(timeEnd).format("HH:mm:ss");
        console.log("End time:", moment(timeEnd).format("HH:mm:ss"));
    } else {
        timeEnd = moment(`${off.sessionDate} ${off.sessionTime}`);
        endTimeString =  moment(timeEnd).format("HH:mm:ss");
        //console.log("End time (old method):", timeEnd.format("HH:mm:ss"));
    }
    
    if (comparisonEndDate > cutOffDate && comparisonStartDate > cutOffDate) {
        const timeDifferenceInMilliseconds = timeEnd - timeStart;
        const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
        duration = timeDifferenceInMinutes;
    } else {
        duration = timeEnd.diff(timeStart, "minutes");
    }
    
    console.log("Duration in minutes:", duration);
    
      
      const entry = {
        startTime: startTimeString,
        endTime: endTimeString,
        startLog: on.log,
        endLog: off.log,
        duration: duration,
        clockOffset: 0, // TODO: FIGURE OUT THIS
      };

      if (entry.duration > 0) {
        if (sessions.has(on.sessionDate)) {
          const session = sessions.get(on.sessionDate);
          session.entries.push(entry);
          session.duration += entry.duration;
          sessions.set(on.sessionDate, session);
        } else {
          sessions.set(on.sessionDate, {
            sessionDate: on.sessionDate,
            duration: entry.duration,
            userId: this.userId,
            entries: [entry],
          });
        }
      }
      on = null;
      off = null;
    }
  });

  sessions = [...sessions.values()];
  return sessions;
};

export default LogsToSessions;
