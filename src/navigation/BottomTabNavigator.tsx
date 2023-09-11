import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import CartIcon from "../assets/images/cart_icon.svg";
import HomeIcon from "../assets/images/home_icon.svg";
import { PALETTE } from "../constants";
import CartScreen from "../screens/Cart";
import ExploreScreen from "../screens/Explore";
import PaymentScreen from "../screens/Payment";
import ProductScreen from "../screens/Product";
import ProductsScreen from "../screens/Products";
import { BottomTabsParamList } from "../types";

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
          tabBarIcon: () => <HomeIcon height={30} width={30} />,
        }}
      />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <CartIcon height={30} width={30} fill={PALETTE.orange} />
          ),
        }}
      />
      <Tab.Screen name="Payment" component={PaymentScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
