import React, { useRef, useEffect} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import  {useAppContext}  from "./src/context/AppContext";
import { navigationRef}  from "./src/helpers/navgationRef";
import useSignoutMutation from "./src/api/cognito/mutations/useSignoutMutation";
import * as Notifications from "expo-notifications";
import WelcomeScreen from "./src/screens/onboarding/WelcomeScreen";
import RecordSessionWalkthroughScreen from "./src/screens/onboarding/RecordSessionWalkthroughScreen";
import SyncWalkthroughScreen from "./src/screens/onboarding/SyncWalkthroughScreen";
import storage from "./src/api/device/localStorage";

// FONTS
import {
  useFonts,
  NunitoSans_200ExtraLight,
  NunitoSans_300Light,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
  NunitoSans_800ExtraBold,
  NunitoSans_900Black,
} from "@expo-google-fonts/nunito-sans";

// SCREENS
import LoadingScreen from "./src/screens/LoadingScreen";
import DrawerContent from "./src/screens/DrawerContent";
// AUTH SCREENS
import SigninScreen from "./src/screens/auth/SigninScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import ForgotScreen from "./src/screens/auth/ForgotScreen";
import NewPasswordScreen from "./src/screens/auth/NewPasswordScreen";
import ConfirmCodeScreen from "./src/screens/auth/ConfirmCodeScreen";
import AutoSignInScreen from './src/screens/auth/SigninScreenAuto';
// MAIN SCREENS
import HomeScreen from './src/screens/main/HomeScreen';
import ArticleScreen from "./src/screens/main/ArticleScreen";
import ReportScreen from "./src/screens/main/ReportScreen";
import SettingsScreen from "./src/screens/main/SettingsScreen";
import SupportersScreen from "./src/screens/main/SupportersScreen";
import AboutScreen from "./src/screens/main/AboutScreen";
import BluetoothScanScreen from "./src/screens/main/BluetoothScanScreen";
import BluetoothSyncScreen from "./src/screens/main/BluetoothSyncScreen";
import { Platform } from "react-native";

const AuthStack = createStackNavigator();
const MainStack = createDrawerNavigator();
const OnboardingStack = createStackNavigator();
let trigger = false;

  // Loading data
  storage.load({
    key: 'signUpTrigger'
  }).then(signUpTrigger => {
    console.log('Loaded signUptrigger:', signUpTrigger);
    trigger = signUpTrigger;
  }).catch(err => {
    console.warn('Failed to signUptrigger:', err.message);
  });
  
export default () => {
  const { state } = useAppContext();
  const { mutate: signOut } = useSignoutMutation();
  const { authenticated, bluetooth } = state;
  const notificationListener = useRef();
  const responseListener = useRef();



  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      if(Platform.OS === 'android'){
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      } else{
        Notifications.remove(notificationListener.current);
        Notifications.remove(responseListener.current);
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  let [fontsLoaded] = useFonts({
    NunitoSans_200ExtraLight,
    NunitoSans_300Light,
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
    NunitoSans_700Bold,
    NunitoSans_800ExtraBold,
    NunitoSans_900Black,
  });

  if (authenticated === null || !fontsLoaded) return <LoadingScreen />;
  return (
    <NavigationContainer ref={navigationRef}>
      {state.authenticated ? (
        state.firstTime ? (
          <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
            <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
            <OnboardingStack.Screen
              name="RecordSessionWalkthrough"
              component={RecordSessionWalkthroughScreen}
            />
            <OnboardingStack.Screen
              name="SyncWalkthrough"
              component={SyncWalkthroughScreen}
            />
          </OnboardingStack.Navigator>
        ) : (
          <MainStack.Navigator
            drawerType="front"
            hideStatusBar={true}
            statusBarAnimation="slide"
            screenOptions={{ headerShown: false }}
            minSwipeDistance={5}
            drawerContent={(props) => (
              <DrawerContent {...props} signOut={signOut} />
            )}
            defaultStatus='closed'
            initialRouteName="Home"
          >
             <MainStack.Screen name="Home" component={HomeScreen} />
             <MainStack.Screen name="Report" component={ReportScreen} />
             <MainStack.Screen name="Settings" component={SettingsScreen} />
             <MainStack.Screen name="Supporters" component={SupportersScreen} />
             <MainStack.Screen name="About" component={AboutScreen} />
             <MainStack.Screen name="Article" component={ArticleScreen} />
            <MainStack.Screen
               name="BluetoothScan"
               component={BluetoothScanScreen}
               options={{ unmountOnBlur: true }}
             />
             <MainStack.Screen
               name="BluetoothSync"
               component={BluetoothSyncScreen}
               options={{ unmountOnBlur: true }} 
             />
          </MainStack.Navigator>
        )
      ) : (
        <AuthStack.Navigator
          initialRouteName= {trigger ? "ConfirmCode" : "Signup"}
          screenOptions={{ headerShown: false }}
        >
          <AuthStack.Screen name="Signin" component={SigninScreen} options={{ unmountOnBlur: true }}/>
          <AuthStack.Screen name="Signup" component={SignupScreen} />
          <AuthStack.Screen name="Forgot" component={ForgotScreen} />
          <AuthStack.Screen name="NewPassword" component={NewPasswordScreen} />
          <AuthStack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
          <AuthStack.Screen name="AutoSignin" component={AutoSignInScreen}/>
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};
