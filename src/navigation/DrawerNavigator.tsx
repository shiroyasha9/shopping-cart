import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import { DrawerParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
