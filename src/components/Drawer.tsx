import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
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

const DRAWER_ITEMS: {
  icon: React.FC<SvgProps>;
  iconProps?: SvgProps;
  onPress?: (navigation: DrawerNavigationHelpers) => void;
  title: string;
}[] = [
    {
      icon: MailIcon,
      title: "Messages",
    },
    {
      icon: BellIcon,
      title: "Notifications",
    },
    {
      icon: CardIcon,
      title: "Payment Methods",
    },
    {
      icon: MoneyIcon,
      title: "Transactions",
      iconProps: {
        fill: PALETTE.white,
      },
    },
    {
      icon: SettingsIcon,
      title: "Settings",
    },
    {
      icon: LogoutIcon,
      title: "Logout",
      onPress: async (navigation: DrawerNavigationHelpers) => {
        await AsyncStorage.removeItem("isLoggedIn");
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
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{
              uri: "https://staticg.sportskeeda.com/editor/2022/08/53e15-16596004347246.png",
            }}
          />
          <View>
            <Text style={styles.name}>Naruto Uzumaki</Text>
            <Text style={styles.username}>@naruto</Text>
          </View>
        </View>

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
              <Icon {...item.iconProps} height={48} width={48} />
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
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  profileImage: {
    height: 96,
    width: 96,
    borderRadius: 48,
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
    paddingVertical: 20,
    borderBottomColor: PALETTE.white,
  },
  drawerItemTitle: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.large,
    marginLeft: 16,
    fontWeight: "600",
  },
  footer: {
    marginBottom: 24,
  },
  footerText: { color: PALETTE.white, textAlign: "center" },
});
