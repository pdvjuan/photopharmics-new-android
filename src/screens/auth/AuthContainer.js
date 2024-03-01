import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Image,
  Text,
} from "react-native";
import { Button } from "../../base";
import { tw } from "tailwind";
import PageContainer from "../PageContainer";
import { useNavigation } from "@react-navigation/core";

const AuthContainer = ({
  children,
  headerText,
  footerText,
  footerBtnText,
  footerNav,
}) => {
  const { navigate } = useNavigation();

  return (
    <PageContainer noHeader>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={tw("flex-1")}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={tw("px-4")}>
          <View style={tw("h-full justify-between")}>
            <View>
              {/* HEADER */}
              <View style={tw("items-center justify-center pt-12 pb-8")}>
                <Image
                  style={[tw("h-32 w-3/4"), { resizeMode: "contain" }]}
                  source={require("../../../assets/logo.png")}
                />
                <Text
                  style={tw(
                    "font-nunito-400 text-xl text-gray-600 py-2 text-center"
                  )}
                >
                  {headerText}
                </Text>
              </View>
              {children}
            </View>

            {/* FOOTER */}
            <View style={tw("pt-8 border-t border-gray-300 my-8")}>
              <Text style={tw("font-nunito-400 self-center py-2")}>
                {footerText}
              </Text>
              <Button
                onPress={() => {
                  navigate(footerNav);
                }}
                title={footerBtnText}
                style={tw("bg-celeste-blue border-celeste-blue")}
                textStyle={tw("text-white")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </PageContainer>
  );
};

export default AuthContainer;
