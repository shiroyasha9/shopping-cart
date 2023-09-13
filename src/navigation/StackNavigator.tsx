import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { LoadingIndicator } from "../components";
import { PALETTE } from "../constants";
import AuthScreen from "../screens/Auth";
import OnboardingScreen from "../screens/Onboarding";
import { RootNativeStackParamList } from "../types";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

function StackNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const init = async () => {
      const isLoggedIn = await AsyncStorage.getItem("currentUser");
      if (isLoggedIn) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    init();
  }, []);

  if (isLoggedIn === null) {
    return <LoadingIndicator style={{ backgroundColor: PALETTE.offWhite }} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: PALETTE.blackberry,
        },
      }}
      initialRouteName={isLoggedIn ? "Drawer" : "Onboarding"}
    >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
