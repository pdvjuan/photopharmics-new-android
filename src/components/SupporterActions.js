import React from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { PencilAltIcon, TrashIcon } from "react-native-heroicons/outline";
import { tw } from "tailwind";
import { useNavigation } from "@react-navigation/core";
import useDeleteSupporterMutation from "../api/celeste/mutations/useDeleteSupporterMutation";
import { useAppContext } from "../context/AppContext";

const SupporterActions = ({ supporter }) => {
  const { navigate } = useNavigation();
  const { state } = useAppContext();
  const { mutate: deleteSupporter, isLoading } = useDeleteSupporterMutation();

  const handleDelete = () => {
    Alert.alert(
      "Delete?",
      "This action cannot be reversed.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () =>
            deleteSupporter({
              userId: state?.user?.sub,
              supporterId: supporter.supporterId,
            }),
          style: "destructive",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={tw("flex-row h-24")}>
      <View style={tw("bg-gray-200 flex-1")} />
      <TouchableOpacity
        onPress={handleDelete}
        style={[tw("bg-red-500 items-center justify-center"), { width: 100 }]}
      >
        <TrashIcon color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate("EditSupporter", { supporterId: supporter.supporterId });
        }}
        style={[tw("bg-green-500 items-center justify-center"), { width: 100 }]}
      >
        <PencilAltIcon name="edit" color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default SupporterActions;
