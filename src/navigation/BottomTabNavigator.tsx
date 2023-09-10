import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

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
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Payment" component={PaymentScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
