import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import { tw } from "../../tailwind";
import { ChevronDownIcon } from "react-native-heroicons/outline";

const AccordionListItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  const animatedController = useRef(new Animated.Value(0)).current;
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  });

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  });

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start();
    }
    setOpen(!open);
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View
          style={tw(
            "flex-row justify-between items-center px-4 py-6 border-t border-b border-celeste-lightgray"
          )}
        >
          <Text style={tw("font-nunito-600 text-base")}>{title}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <ChevronDownIcon size={20} color="black" />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[tw("overflow-hidden"), { height: bodyHeight }]}>
        <View
          style={tw("bg-white py-2 px-4 absolute bottom-0 w-full")}
          onLayout={(event) =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </>
  );
};
export default AccordionListItem;
