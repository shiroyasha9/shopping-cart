import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useAtomValue } from "jotai";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ToastModule } from "../utils/modules";

import { FONT_SIZE, PALETTE } from "../constants";
import { currentUserAtom } from "../store";
import { scale, verticalScale } from "../utils";

const showComingSoonToast = () => {
  ToastModule.toastMe("Coming soon 🚀", ToastModule.SHORT);
};

const iconStyle = {
  fontSize: scale(30),
  color: "white",
};

const DRAWER_ITEMS: {
  onPress?: (navigation: DrawerNavigationHelpers) => void;
  title: string;
  icon?: React.ReactNode;
}[] = [
  {
    icon: <IoniconsIcon name="mail" style={iconStyle} />,
    title: "Messages",
    onPress: showComingSoonToast,
  },
  {
    icon: <IoniconsIcon name="notifications" style={iconStyle} />,
    title: "Notifications",
    onPress: showComingSoonToast,
  },
  {
    icon: <IoniconsIcon name="card" style={iconStyle} />,
    title: "Payment Methods",
    onPress: showComingSoonToast,
  },
  {
    icon: <MaterialIcon name="attach-money" style={iconStyle} />,
    title: "Transactions",
    onPress: showComingSoonToast,
  },
  {
    icon: <IoniconsIcon name="settings" style={iconStyle} />,
    title: "Settings",
    onPress: showComingSoonToast,
  },
  {
    icon: <MaterialIcon name="logout" style={iconStyle} />,
    title: "Logout",
    onPress: async (navigation: DrawerNavigationHelpers) => {
      await AsyncStorage.removeItem("currentUser");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Onboarding",
          },
        ],
      });
    },
  },
];

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const currentUser = useAtomValue(currentUserAtom);
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://staticg.sportskeeda.com/editor/2022/08/53e15-16596004347246.png",
          }}
        />
        <View>
          <Text style={styles.name}>{currentUser?.name}</Text>
          <Text style={styles.username}>{currentUser?.phoneNumber}</Text>
        </View>
      </View>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 0,
        }}
      >
        {DRAWER_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => item.onPress?.(props.navigation)}
              style={[
                styles.drawerItemContainer,
                {
                  borderBottomWidth: index === DRAWER_ITEMS.length - 1 ? 0 : 2,
                },
              ]}
            >
              {Icon}
              <Text style={styles.drawerItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>+ 00 000 000 00 00</Text>
        <Text style={styles.footerText}>loremipsum@dolor.sit</Text>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PALETTE.blackberry,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(32),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(20),
    marginTop: verticalScale(20),
    justifyContent: "space-around",
  },
  profileImage: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
  },
  name: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.large,
    color: PALETTE.white,
  },
  username: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.medium,
  },
  drawerItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(16),
    borderBottomColor: PALETTE.white,
  },
  drawerItemTitle: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.large,
    marginLeft: scale(16),
    fontWeight: "600",
  },
  footer: {
    marginBottom: verticalScale(20),
  },
  footerText: {
    color: PALETTE.white,
    textAlign: "center",
  },
});
