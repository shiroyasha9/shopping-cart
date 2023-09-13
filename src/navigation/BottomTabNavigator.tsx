import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { scale } from "react-native-size-matters";

import CartIcon from "../assets/images/cart_icon.svg";
import CategoriesIcon from "../assets/images/categories_icon.svg";
import HomeIcon from "../assets/images/home_icon.svg";
import MoneyIcon from "../assets/images/money_icon.svg";
import { PALETTE } from "../constants";
import CartScreen from "../screens/Cart";
import ExploreScreen from "../screens/Explore";
import PaymentScreen from "../screens/Payment";
import { BottomTabsParamList } from "../types";
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
          tabBarIcon: () => <HomeIcon height={scale(30)} width={scale(30)} />,
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
            <CategoriesIcon
              height={scale(30)}
              width={scale(30)}
              fill={PALETTE.orange}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <CartIcon
              height={scale(30)}
              width={scale(30)}
              fill={PALETTE.orange}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          tabBarIcon: () => (
            <MoneyIcon
              height={scale(30)}
              width={scale(30)}
              fill={PALETTE.orange}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
