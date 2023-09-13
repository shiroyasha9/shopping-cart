import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { useAtomValue } from "jotai";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgProps } from "react-native-svg";
import BellIcon from "../assets/images/bell_icon.svg";
import CardIcon from "../assets/images/card_icon.svg";
import LogoutIcon from "../assets/images/logout_icon.svg";
import MailIcon from "../assets/images/mail_icon.svg";
import MoneyIcon from "../assets/images/money_icon.svg";
import SettingsIcon from "../assets/images/settings_icon.svg";
import { FONT_SIZE, PALETTE } from "../constants";
import { currentUserAtom } from "../store";
import Toast from "react-native-toast-message";
import { scale, verticalScale } from "react-native-size-matters";

const showComingSoonToast = () => {
  Toast.show({
    type: "info",
    text1: "Coming Soon 🚀",
    text2: "This feature is not available yet",
    position: "bottom",
  });
};

const DRAWER_ITEMS: {
  icon: React.FC<SvgProps>;
  iconProps?: SvgProps;
  onPress?: (navigation: DrawerNavigationHelpers) => void;
  title: string;
}[] = [
    {
      icon: MailIcon,
      title: "Messages",
      onPress: showComingSoonToast,
    },
    {
      icon: BellIcon,
      title: "Notifications",
      onPress: showComingSoonToast,
    },
    {
      icon: CardIcon,
      title: "Payment Methods",
      onPress: showComingSoonToast,
    },
    {
      icon: MoneyIcon,
      title: "Transactions",
      iconProps: {
        fill: PALETTE.white,
      },
      onPress: showComingSoonToast,
    },
    {
      icon: SettingsIcon,
      title: "Settings",
      onPress: showComingSoonToast,
    },
    {
      icon: LogoutIcon,
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
              <Icon {...item.iconProps} height={scale(40)} width={scale(40)} />
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
