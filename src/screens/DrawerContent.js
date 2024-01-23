import React from "react";
import { Text, TouchableOpacity, View, Image, Alert } from "react-native";
import { tw, getColor } from "../../tailwind";
import {
  HomeIcon,
  CalendarIcon,
  UserCircleIcon,
  HeartIcon,
  InformationCircleIcon,
} from "react-native-heroicons/outline";



const TEXT_STYLES = tw("text-2xl text-celeste-darkgray text-left flex-1 pl-4");

const DrawerContent = ({ state, navigation, signOut }) => {
  const getLinkStyles = (index) => {
    let styles = "pl-6 py-4 mx-2 flex-row rounded";
    if (index === state.index) {
      styles = styles + " bg-gray-200";
    }
    return styles;
  };

  const handleLogout = () => {
    Alert.alert("Are you sure you want to logout?", null, [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", onPress: signOut },
    ]);
  };

  return (
    // TODO: Replace
    // This <View> directly below used to be a LinearGradient before removing Expo
    <View
      // colors={["#FFFFFF", "#DFECFF"]}
      // locations={["0", ".7"]}
      style={tw("flex-1")}
    >
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={tw("w-full my-16 items-center")}>
          <Image
            style={[tw("w-3/4 h-24"), { resizeMode: "contain" }]}
            source={require("../../assets/logo.png")}
          />
        </View>
        <TouchableOpacity
          style={tw(getLinkStyles(0))}
          onPress={() => navigation.navigate("Home")}
        >
          <HomeIcon size={32} color={getColor("celeste-darkgray")} />
          <Text style={TEXT_STYLES}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw(getLinkStyles(1))}
          onPress={() => navigation.navigate("Report")}
        >
          <CalendarIcon size={32} color={getColor("celeste-darkgray")} />
          <Text style={TEXT_STYLES}>Report</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={tw(getLinkStyles(3))}
          onPress={() => navigation.navigate("Supporters")}
        >
          <HeartIcon size={32} color={getColor("celeste-darkgray")} />
          <Text style={TEXT_STYLES}>Supporters</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={tw(getLinkStyles(4))}
          onPress={() => navigation.navigate("About")}
        >
          <InformationCircleIcon
            size={32}
            color={getColor("celeste-darkgray")}
          />
          <Text style={TEXT_STYLES}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw(getLinkStyles(2))}
          onPress={() => navigation.navigate("Settings")}
        >
          <UserCircleIcon size={32} color={getColor("celeste-darkgray")} />
          <Text style={TEXT_STYLES}>Settings</Text>
        </TouchableOpacity>
        
      </View>
      <View>
        <TouchableOpacity
          style={tw("w-full bottom-0 h-16")}
          onPress={handleLogout}
        >
          <Text
            style={tw("font-nunito-700 text-celeste-blue text-center text-2xl")}
          >
            LOG OUT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;
