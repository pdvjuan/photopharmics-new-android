import React from "react";
import { Text, View } from "react-native";
import CalendarDay from "./CalendarDay";
import GetDatesInMonth from "../helpers/calendar/GetDatesInMonth";
import GetDatesWithSessions from "../helpers/calendar/GetDatesWithSessions";
import moment from "moment";
import { tw } from "../../tailwind";

const Calendar = ({ monthDate, sessions }) => {
  const dates = GetDatesInMonth(monthDate);
 const datesWithSessions = GetDatesWithSessions(sessions);
  let today = new Date();
  let startOfMonth = moment(monthDate).startOf("month").toDate();
  let endOfMonth = moment(monthDate).endOf("month").toDate();

  return (
    <View
      style={[
        tw("bg-white rounded-lg py-2 my-1 mx-2"),
        {
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
          elevation: 5,
        },
      ]}
    >
      <Text style={tw("font-nunito-400 text-center text-2xl py-2")}>
        {moment(monthDate).format("MMMM")} {moment(monthDate).format("YYYY")}
      </Text>
      <View style={tw("flex-row flex-wrap")}>
        {dates.map((date) => (
          <CalendarDay
            key={date.toString()}
            date={date}
             sessions={sessions}
            today={today}
            startOfMonth={startOfMonth}
            endOfMonth={endOfMonth}
             datesWithSessions={datesWithSessions}
          />
        ))}
      </View>
    </View>
  );
};

export default Calendar;
