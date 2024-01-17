import React from "react";
import { Text, View } from "react-native";
import { MinusCircleIcon} from "react-native-heroicons/outline";
import { XCircleIcon } from "react-native-heroicons/solid";
import moment from "moment";
import { tw, getColor } from "tailwind";
import GetStatusIcon from "../helpers/GetStatusIcon";

// TODO: MAKE THIS CHECK SESSION BY DATE. THIS COMPONENT RENDERS 100+ times so we should move almost all logic out of it
const CalendarDay = ({
  date,
  today,
  sessions,
  startOfMonth,
  endOfMonth,
  datesWithSessions,
}) => {
  let session = false;
  const _date = moment(date).format("YYYY-MM-DD");

  if (datesWithSessions[_date]) {
    session = sessions.find((session) => session.sessionDate === _date);
  }

  if (date < startOfMonth || endOfMonth < date)
    return <View style={[tw("items-center py-1"), { flexBasis: "14.28%" }]} />;
  return (
    <View
      style={[
        tw("items-center py-1"),
        { flexBasis: "14.28%" },
        date === today && tw("border border-celeste-lightgray rounded"),
      ]}
    >
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        {moment(date).format("D")}
      </Text>
      {date > today ? (
        <MinusCircleIcon color={"white"} size={20} />
      ) : session ? (
        GetStatusIcon(session.duration, 29, 45, 20)
      ) : (
        // <MinusCircleIcon color={getColor("gray-200")} size={20} />
        <XCircleIcon color={getColor("red-500")} size={20} />
      )}
    </View>
  );
};

export default CalendarDay;
