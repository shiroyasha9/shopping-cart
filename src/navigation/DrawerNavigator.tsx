import {
  createDrawerNavigator,
  type DrawerHeaderProps,
} from "@react-navigation/drawer";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CartIcon from "../assets/images/cart_icon.svg";
import HamburgerMenuIcon from "../assets/images/hamburger_icon.svg";
import CustomDrawer from "../components/Drawer";
import { FONT_SIZE, PALETTE } from "../constants";
import type { DrawerParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerHeader = (props: DrawerHeaderProps) => {
  const insets = useSafeAreaInsets();

  const { navigation } = props;
  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top,
        },
      ]}
    >
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <HamburgerMenuIcon height={32} width={32} />
      </TouchableOpacity>
      <Text style={styles.headerLogo}>Lorem ipsum</Text>
      <TouchableOpacity>
        <CartIcon height={32} width={32} />
      </TouchableOpacity>
    </View>
  );
};

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={() => ({
        header: (props) => <DrawerHeader {...props} />,
        drawerStyle: {
          width: Dimensions.get("window").width / 1.25,
        },
      })}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="Main" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: "#fff",
  },
  headerLogo: {
    fontWeight: "bold",
    height: 32,
    flex: 1,
    textAlign: "center",
    fontSize: FONT_SIZE.large,
    paddingTop: 2,
    color: PALETTE.blackberry,
  },
});
