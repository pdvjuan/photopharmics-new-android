import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from "react-native-heroicons/solid";
import { getColor } from "tailwind";

const GetStatusIcon = (time, warn, success, size = 15) => {
  if (time >= success) {
    return <CheckCircleIcon color={getColor("green-500")} size={size} />;
  } else if (time > warn && time < success) {
    return <ExclamationCircleIcon color={getColor("yellow-500")} size={size} />;
  } else {
    return <XCircleIcon color={getColor("red-500")} size={size} />;
  }
};

export default GetStatusIcon;
