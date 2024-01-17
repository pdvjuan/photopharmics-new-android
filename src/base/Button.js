import React from "react";
import { tw } from "tailwind";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

const Button = ({ title, onPress, style, textStyle, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          tw(
            "bg-celeste-blue p-2 rounded items-center border border-celeste-blue"
          ),
          style,
        ]}
      >
        <Text style={{ ...tw("text-base"), ...textStyle }}>
          {isLoading ? (
            <ActivityIndicator style={tw("pt-1")} size="small" color="black" />
          ) : (
            title
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
