import {
  createDrawerNavigator,
  type DrawerHeaderProps,
} from "@react-navigation/drawer";
import { useAtomValue } from "jotai";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-size-matters";
import CartIcon from "../assets/images/cart_icon.svg";
import HamburgerMenuIcon from "../assets/images/hamburger_icon.svg";
import { StatusBar } from "../components";
import CustomDrawer from "../components/Drawer";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";
import type { DrawerParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerHeader = (props: DrawerHeaderProps) => {
  const cart = useAtomValue(cartAtom);

  const { navigation } = props;

  const onCartPress = () => {
    navigation.navigate("Cart");
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <HamburgerMenuIcon height={scale(32)} width={scale(32)} />
      </TouchableOpacity>
      <Text style={styles.headerLogo}>Lorem ipsum</Text>
      <TouchableOpacity onPress={onCartPress}>
        <View style={styles.cartCountContainer}>
          <Text style={styles.cartCount}>{cart.length}</Text>
        </View>
        <CartIcon
          height={scale(32)}
          width={scale(32)}
          fill={PALETTE.blackberry}
        />
      </TouchableOpacity>
    </View>
  );
};

function DrawerNavigator() {
  return (
    <>
      <StatusBar backgroundColor={PALETTE.orange} barStyle="light-content" />
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
    </>
  );
}

export default DrawerNavigator;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: PALETTE.offWhite,
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
  cartCountContainer: {
    position: "absolute",
    top: scale(0),
    right: scale(-5),
    backgroundColor: PALETTE.orange,
    borderRadius: 50,
    width: scale(14),
    height: scale(14),
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartCount: {
    fontSize: FONT_SIZE.tiny,
    color: PALETTE.offWhite,
    fontWeight: "bold",
  },
});
