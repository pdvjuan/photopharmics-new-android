import moment from "moment";
import DeviceInfo from "react-native-device-info";

const LogsToSessions = (logs) => {
  let userTimeZone = null;

  if (Platform.OS === "android") {
    userTimeZone = DeviceInfo.timeZone;
  }
  else{
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

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
      let testEnd = null;
      let duration = null;
      let startTimeString = null;
      let endTimeString = null;


      if(comparisonStartDate > cutOffDate){
        // Combine session date and time strings
        const combinedDateTime = `${on.sessionDate}T${on.sessionTime}Z`;

        // Create a Date object from the combined date and time
        const sessionDateTime = new Date(combinedDateTime);

        sessionDateTime.setHours(sessionDateTime.getHours() - 2);

        // Convert the session date and time to the user's local time zone
        const sessionDateTimeLocal = new Date(sessionDateTime.toLocaleString(undefined, { timeZone: userTimeZone }));

        
        testStart = sessionDateTimeLocal;
        
        timeStart = testStart;
        console.log("new conversion",timeStart);

        if(isNaN(timeStart)){
          timeStart = new moment(`${on.sessionDate} ${on.sessionTime}`);
          startTimeString = timeStart.format("hh:mm:ss");
          console.log("start old, ", startTimeString);
        } else{
          // Extract the time portion (hh:mm:ss) using string manipulation
        const timeString = timeStart.toISOString().split('T')[1].split('.')[0];

        startTimeString = timeString;
        }
        console.log(startTimeString); // Outputs "13:14:13"

      } else{
        timeStart = new moment(`${on.sessionDate} ${on.sessionTime}`);
        startTimeString = timeStart.format("hh:mm:ss");
        console.log("start old, ", startTimeString);
      }

      //timeStart.add(this.deviceOffset, "minutes");

      let timeEnd = null;
      
      console.log("end input, ", `${off.sessionDate} ${off.sessionTime}`);

      if(comparisonEndDate > cutOffDate) {
        // Combine session date and time strings
        const combinedDateTime1 = `${off.sessionDate}T${off.sessionTime}Z`;

        // Create a Date object from the combined date and time
        const sessionDateTime1 = new Date(combinedDateTime1);

        sessionDateTime1.setHours(sessionDateTime1.getHours()-2);


        // Convert the session date and time to the user's local time zone
        const sessionDateTimeLocal1 = new Date(sessionDateTime1.toLocaleString(undefined, { timeZone: userTimeZone }));
      

        testEnd = sessionDateTimeLocal1;
        
        timeEnd = testEnd;
        console.log("new conversion end",timeEnd);


        // Extract the time portion (hh:mm:ss) using string manipulation
        const timeStringEnd = timeEnd.toISOString().split('T')[1].split('.')[0];

        endTimeString = timeStringEnd;

        if(isNaN(timeEnd)){
          timeEnd = new moment(`${off.sessionDate} ${off.sessionTime}`);
          endTimeString = timeEnd.format("hh:mm:ss");
          console.log("end old, ", endTimeString);
        } else{
         // Extract the time portion (hh:mm:ss) using string manipulation
          const timeStringEnd = timeEnd.toISOString().split('T')[1].split('.')[0];
          endTimeString = timeStringEnd;
        }
        
        console.log(endTimeString); // Outputs "13:14:13"
      }
      else {
        timeEnd = new moment(`${off.sessionDate} ${off.sessionTime}`);
        endTimeString = timeEnd.format("hh:mm:ss");
        console.log("end old, ", endTimeString);
      }

      

      if((comparisonEndDate > cutOffDate) && (comparisonStartDate > cutOffDate)){
        // Calculate the difference in minutes
        const timeDifferenceInMilliseconds = testEnd- testStart;
        const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
        duration = timeDifferenceInMinutes;
      } else {
        duration = timeEnd.diff(timeStart, "minutes");
      }
      
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
