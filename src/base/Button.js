import React from "react";
import { tw } from "../../tailwind";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";

const Button = ({ title, onPress, style, textStyle, isLoading }) => {
  return (
    <TouchableOpacity onPress={onPress}
      disabled={isLoading} // Disable button interactions when loading
      style={[
        tw(
          "bg-celeste-blue p-2 rounded items-center border border-celeste-blue"
        ),
        isLoading && tw("bg-gray-300 border-gray-300"), // Optionally change the style to indicate disabled state
        style,
      ]}
    >
      <View style={tw("items-center")}>
        {isLoading ? (
          <ActivityIndicator style={tw("pt-1")} size="small" color="black" />
        ) : (
          <Text style={{ ...tw("text-base"), ...textStyle }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
