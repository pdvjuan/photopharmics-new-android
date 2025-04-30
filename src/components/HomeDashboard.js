import React from "react";
import moment from "moment";
import { View, Text, TouchableOpacity } from "react-native";

import { useAppContext } from "../context/AppContext";
import { tw } from "../../tailwind";
import {
  CalendarIcon,
  PresentationChartBarIcon,
  RefreshIcon,
  TrendingUpIcon,
} from "react-native-heroicons/outline";
import GetTodaysSession from "../helpers/sessions/GetTodaysSession";
import GetCurrentStreak from "../helpers/sessions/GetCurrentStreak";
import HomeDashboardLoading from "../skeletons/HomeDashboardLoading";
import { useNavigation } from "@react-navigation/core";
import DataRow from "./DashboardDataRow";

const HomeDashboard = ({ sessions }) => {
  const { state } = useAppContext();
  const { given_name } = state.user;
  // let recent_sync = state?.user?.["custom:recent_sync"];
  const { navigate } = useNavigation();

  if (!sessions) return <HomeDashboardLoading />;

  const todaysSession = GetTodaysSession(sessions);
  const currentStreak = GetCurrentStreak(sessions);

  return (
    <TouchableOpacity onPress={() => navigate("Report")}>
      <View style={tw("bg-white pt-5 px-4 shadow")}>
        {/* NAME */}
        <View style={tw("justify-center items-center")}>
          <Text style={tw("text-celeste-darkgray text-xl font-bold")}>
            Welcome {given_name}
          </Text>
        </View>

        {/* DATA */}
        <View style={tw("py-2")}>
          <DataRow
            Icon={TrendingUpIcon}
            name="Current Streak"
            value='10 days'
          />
          <DataRow
            Icon={PresentationChartBarIcon}
            name="Last Sync"
            value={ '30 seconds ago'
              // recent_sync
              //   ? moment(parseInt(recent_sync)).format("MM/DD/YY")
              //   : "-"
            }
          />
          <DataRow
            Icon={RefreshIcon}
            name="Total Sessions"
            value={`100 sessions`}
          />
          <DataRow
            Icon={CalendarIcon}
            name="Today's Session"
            value={`45/60 mins`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeDashboard;
