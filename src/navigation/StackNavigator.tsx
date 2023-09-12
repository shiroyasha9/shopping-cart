import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { PALETTE } from "../constants";
import AuthScreen from "../screens/Auth";
import OnboardingScreen from "../screens/Onboarding";
import { RootNativeStackParamList } from "../types";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootNativeStackParamList>();

function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: PALETTE.blackberry,
        },
      }}
      initialRouteName="Onboarding"
    >
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;
