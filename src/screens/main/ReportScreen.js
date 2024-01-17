import React, { useEffect, useRef } from "react";
import { Text, View, FlatList } from "react-native";
import { tw } from "tailwind";
import PageContainer from "../PageContainer";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import { getColor } from "tailwind";
import Calendar from "../../components/Calendar";
import GetMonths from "../../helpers/calendar/GetMonths";
import useSessionsQuery from "../../api/celeste/queries/useSessionsQuery";
import PulsingDiv from "../../skeletons/PulsingDiv";
import { useAppContext } from "../../context/AppContext";

export default function Reports() {
  const { state } = useAppContext();
  const {
    data: sessions,
    isLoading,
    isError,
  } = useSessionsQuery(state?.user?.sub);
  const monthsRef = useRef();
  const months = GetMonths();

  useEffect(() => {
    setTimeout(() => {
      monthsRef.current.scrollToIndex({ animated: true, index: 5 });
    }, 500);
  }, []);

  if (isError) return null;
  return (
    <PageContainer>
      <View
        style={[
          tw("bg-white h-20 py-2 px-7 z-10"),
          {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5,
          },
        ]}
      >
        <View style={tw("flex-1 flex-row items-center justify-between")}>
          <View style={tw("flex-row items-center")}>
            <XCircleIcon color={getColor("red-500")} size={24} />
            <Text style={tw("font-nunito-400 text-xs pl-2")}>0 - 29 min</Text>
          </View>
          <View style={tw("flex-row items-center")}>
            <ExclamationCircleIcon color={getColor("yellow-500")} size={24} />
            <Text style={tw("font-nunito-400 text-xs pl-2")}>30 - 44 min</Text>
          </View>
          <View style={tw("flex-row items-center")}>
            <CheckCircleIcon color={getColor("green-500")} size={24} />
            <Text style={tw("font-nunito-400 text-xs pl-2")}>45 - 60 min</Text>
          </View>
        </View>

        <View style={tw("flex-row justify-between")}>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            s
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            m
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            t
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            w
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            t
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            f
          </Text>
          <Text
            style={tw(
              "font-nunito-400 uppercase text-celeste-darkgray text-2xl"
            )}
          >
            s
          </Text>
        </View>
      </View>

      <FlatList
        ref={monthsRef}
        data={months}
        keyExtractor={(month) => JSON.stringify(month)}
        renderItem={({ item }) =>
          isLoading ? (
            <PulsingDiv classes="bg-gray-400 rounded-xl mx-4 my-1 h-80" />
          ) : (
            <Calendar monthDate={item} sessions={sessions} />
          )
        }
        onScrollToIndexFailed={() => {
          setTimeout(() => {
            monthsRef.current.scrollToIndex({ animated: true, index: 5 });
          }, 500);
        }}
      />
    </PageContainer>
  );
}
