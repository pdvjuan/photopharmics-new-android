import React, { useRef } from "react";
import { Animated } from "react-native";
import { tw } from "tailwind";

export default ({ classes }) => {
  const pulse = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(pulse, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(pulse, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(pulse, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ])
  ).start();

  return <Animated.View style={[tw(classes), { opacity: pulse }]} />;
};
