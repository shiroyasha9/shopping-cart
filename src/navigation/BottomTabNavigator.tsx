import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { PALETTE } from "../constants";
import CartScreen from "../screens/Cart";
import ExploreScreen from "../screens/Explore";
import PaymentScreen from "../screens/Payment";
import { BottomTabsParamList } from "../types";
import { scale } from "../utils";
import CategoryNavigator from "./CategoryNavigator";

const Tab = createBottomTabNavigator<BottomTabsParamList>();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      sceneContainerStyle={{
        backgroundColor: PALETTE.offWhite,
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: () => (
            <IoniconsIcon
              name="home-outline"
              size={scale(30)}
              color={PALETTE.orange}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={CategoryNavigator}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Drawer", {
              screen: "Main",
              params: {
                screen: "Category",
                params: {
                  screen: "Categories",
                },
              },
            });
          },
        })}
        options={{
          tabBarIcon: () => (
            <IoniconsIcon
              name="grid-outline"
              size={scale(30)}
              color={PALETTE.orange}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <IoniconsIcon
              name="cart-outline"
              size={scale(30)}
              color={PALETTE.orange}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: () => (
            <MaterialIcon
              name="attach-money"
              size={scale(30)}
              color={PALETTE.orange}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
