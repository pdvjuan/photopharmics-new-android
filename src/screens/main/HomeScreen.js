import React from 'react';
import { View, Text, FlatList, Alert} from 'react-native';
import { useEffect, useState , useRef } from 'react';
import usePostsQuery from "../../api/celeste-blog/queries/usePostsQuery";
import useSessionsQuery from "../../api/celeste/queries/useSessionsQuery";
import HomeDashboard from "../../components/HomeDashboard";
import ArticleCard from "../../components/ArticleCard";
import useNotificationsPermissionQuery from "../../api/device/queries/useNotificationsPermissionQuery";
import { useNavigation } from '@react-navigation/native';
import PulsingDiv from "../../skeletons/PulsingDiv";
import PageContainer from "../PageContainer";
import {useAppContext}  from "../../context/AppContext";
import { navigate} from "../../helpers/navgationRef";
import { tw,  getColor } from "tailwind";
import {
  CalendarIcon,
  PresentationChartBarIcon,
  RefreshIcon,
  TrendingUpIcon,
} from "react-native-heroicons/outline";
import DataRow from "../../components/DashboardDataRow";
import DataRow1 from "../../components/DashboardDataRow1";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/outline";
import Calendar from "../../components/Calendar";
import GetOneMonth from "../../helpers/calendar/GetOneMonth";
import * as Notifications from "expo-notifications";
import DeviceInfo from "react-native-device-info";
import { requestBluetoothPermission } from "../../helpers/bluetooth/RequestBluetoothPermission";

const HomeScreen = () => {
  // GETS EXPO PUSH PERMISSIONS

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // Extract screen name from notification data
      const { screen } = response.notification.request.content.data;
    
      if (screen) {
        navigate(screen);
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    // Directly call the imported function
    const checkPermissions = async () => {
      const hasPermission = await requestBluetoothPermission();
      if (!hasPermission) {
        
      }
    };

    checkPermissions();

  }, []);

  // TODO: Replace
  const monthsRef = useRef();
  const months = GetOneMonth();

  useEffect(() => {
    setTimeout(() => {
      monthsRef.current.scrollToIndex({ animated: true, index: 0 });
    }, 500);
  }, []);

  const navigation = useNavigation();
  const { state } = useAppContext();
  const { user } = state;
  const [givenName, setGivenName] = useState(user.given_name);
  const [recent_sync, setRecentSync] = useState(user?.["custom:recent_sync"]);

  // const {
  //  data: cards,
  //  isLoading: isLoadingCards,
  //  isFetching: isFetchingCards,
  //  refetch,
  // } = usePostsQuery("card");
 
  // console.log(cards);

  let userTimeZone = null;

  userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  
  
  const timestamp = parseInt(recent_sync, 10); // Parse it as an integer
  let formattedDate = "Last Sync Not Found"

  if (!isNaN(timestamp)) {
    const date = new Date(timestamp);
    console.log(date);
    // Now you can format the date as needed, e.g., MM/DD/YYYY
    formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  } else {
    console.error("Invalid timestamp format");
  }

    const { data: sessions, 
    isLoading,
    isError,
  } = useSessionsQuery(state?.user?.sub);

  
  let continuousDays = 0; // Initialize to 0
  let duration = 0;
  let length = "Loading";
  let recentDate = "None";
  let timeLeft = 60;

  if(!sessions){
    length = "No"
  }

  if (sessions && sessions.length > 0) {
    sessions.sort((a, b) => {
      const dateA = new Date(a.sessionDate);
      const dateB = new Date(b.sessionDate);
      
      // Compare dates directly
      return dateB - dateA;
    });

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const todayDateStr = `${year}-${month}-${day}`;
    console.log("Today's date in YYYY-MM-DD format:", todayDateStr);

    let previousDate = new Date();

    // Check if there's an entry for today and start the streak from 1 if so
    if (sessions.some(session => new Date(session.sessionDate).toISOString().split('T')[0] === todayDateStr)) {
      continuousDays = 1;
    }

    for (const session of sessions) {
      const sessionDate = new Date(session.sessionDate);
    
      // Subtract one day from previousDate
      const dayBeforePrevious = new Date(previousDate);
      dayBeforePrevious.setDate(dayBeforePrevious.getDate() - 1);
    
      // Convert both dates to "YYYY-MM-DD" format for comparison
      const sessionDateString = sessionDate.toISOString().split('T')[0];
      const dayBeforePreviousString = dayBeforePrevious.toISOString().split('T')[0];
    
      // Check if the session date is exactly one day before the previous session
      if (sessionDateString === dayBeforePreviousString) {
        continuousDays++;
      } else if (sessionDateString !== todayDateStr) {
        // If the session date is not today and not consecutive, break the loop
        break;
      }
    
      // Update previousDate for the next iteration
      previousDate = sessionDate;
    }

    recentDate = sessions[0].sessionDate;
    const parts = recentDate.split("-");
    const reformattedDate = `${parts[1]}/${parts[2]}/${parts[0]}`;
    recentDate = reformattedDate;

    
    length = sessions.length;

    // Create a Date object
    const userDate = new Date();

    // Options for formatting the date
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: userTimeZone,
    };

    // Use toLocaleString with the specified options
    const formattedDate = userDate.toLocaleString('en-US', options);

    const yearV = userDate.getFullYear();
    const monthV = String(userDate.getMonth() + 1).padStart(2, '0');
    const dayV = String(userDate.getDate()).padStart(2, '0');

    const todayDate = `${yearV}-${monthV}-${dayV}`;

    console.log("HOME: Toadys Date: ",todayDate); // Outputs: YYYY-MM-DD

    // Filter the sessions to get the one with today's date
    const todaySession = sessions.find(session => session.sessionDate === todayDate);
    
    // Check if a session with today's date was found
    if (todaySession) {
     // Grab the duration value from the found session
      duration = todaySession.duration;

      if(duration > 60){
        timeLeft = 0
      } else{
        timeLeft = timeLeft - duration
      }


      // Now, 'duration' contains the duration value for today's session
      console.log('HOME: Today\'s session duration:', duration);
    } else {
      // No session found for today
      console.log('HOME: No session found for today.');
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("in 30 s");
  //     navigate("BluetoothScan");
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [navigate]);

const getHeader = () => {
  return(
  //<TouchableOpacity onPress={() => navigate("Report")}>
  <View style={tw("bg-white pt-5 px-4 shadow")}>
    {/* NAME */}
    <View style={tw("justify-center items-center")}>
      <Text style={tw("text-celeste-darkgray text-xl font-bold")}>
         Welcome {givenName} 
      </Text>
    </View>

    {/* DATA */}
    <View style={tw("py-2")}>
     <Text style={tw("text-celeste-darkgray text-xl font-bold","paddingTop:10")}>
        {/* Welcome {given_name} */}
        My Information
      </Text>
      <DataRow
        Icon={TrendingUpIcon}
        name="Current Streak"
        value= {continuousDays}
      />
      <DataRow
        Icon={PresentationChartBarIcon}
        name="Last Sync"
        value={recentDate}
      />
      <DataRow1
        Icon={RefreshIcon}
        name="Total Sessions"
        value={length + " Sessions"}
      />

      
      {/* <Text style={tw("text-celeste-darkgray text-xl font-bold","paddingTop:10")}>
   
        Today's Session Information
      </Text>
      

      <DataRow
        Icon={RefreshIcon}
        name="Time Elapsed"
        value={duration + " Minutes"}
      />

      <DataRow
        Icon={CalendarIcon}
        name="Time Remaining"
        value={timeLeft + " Minutes"}
      /> */}

      {/* <TouchableOpacity onPress={handleToggle}>
      <DataRow
        Icon={RefreshIcon}
        name="Auto Sync"
        value={isToggleOn ? textWhenOn : textWhenOff}
      />
      </TouchableOpacity> */}
      
       {/* <CountDown
      //running={false}
        until={60 * 59 + 59}
        size={20}
        onFinish={() => alert('Finished')}
        digitStyle={{borderWidth:1, marginTop:10}}
        digitTxtStyle={{color: '#00A9E0'}}
        timeToShow={['M', 'S']}
        timeLabels={{m: 'MM', s: 'SS'}}
      /> */}
      <View style={{flexDirection:'row', paddingBottom:10, justifyContent:'space-between'}}>
      </View> 
    </View>
  </View>
 

  )
}
  useEffect(() => {
  console.log("HERE");
    let recent_sync = state?.user?.["custom:recent_sync"];
    const NotificationDays = 0.40;
    const NotificationLimit =
      new Date().getTime() - NotificationDays * 24 * 60 * 60 * 1000;

    if ((!recent_sync || recent_sync < NotificationLimit) && !state.firstTime) {
      Alert.alert(
        "Welcome to your daily session!",
        "Tap below to upload your Celeste session data from your Celeste device.",
        [          
          {
            text: "Remind me later",
            style: "cancel",
          },
          { text: "Upload", onPress: () => navigate("BluetoothScan") },
        ]
      );
    }

  }, [state.user, state.firstTime]);

  return (
    <PageContainer>
      {/* <FlatList
        ListHeaderComponent={getHeader}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            onRefresh={refetch}
            refreshing = {isLoadingCards || isFetchingCards}
            tintColor="gray"
          />
        }
        data={cards}
        renderItem={({item}) => <ArticleCard card = {item} />}
        showsVerticalScrollIndicator = {false}
        stickySectionHeadersEnabled = {false}
       /> */}

       {getHeader()}

       <View
        style={[
          tw("bg-white h-20 py-2 px-7 z-10"),
          {
            shadowColor: "#000",
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 3,
            elevation: 5
          },
        ]}
      >
        
        <View style={tw("flex-1 flex-row items-center justify-between")}>
          <View style={tw("flex-row items-center")}>
            <XCircleIcon color={getColor("red-500")} size={20} />
            <Text style={tw("font-nunito-400 pl-1")}>0 - 29 mins</Text>
          </View>
          <View style={tw("flex-row items-center")}>
            <ExclamationCircleIcon color={getColor("yellow-500")} size={20} />
            <Text style={tw("font-nunito-400 pl-1")}>30 - 44 mins</Text>
          </View>
          <View style={tw("flex-row items-center")}>
            <CheckCircleIcon color={getColor("green-500")} size={20} />
            <Text style={tw("font-nunito-400 pl-1")}>45 - 60 mins</Text>
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
            monthsRef.current.scrollToIndex({ animated: true, index: 1 });
          }, 500);
        }}
      />
      
    </PageContainer>
  );
};

export default HomeScreen;

