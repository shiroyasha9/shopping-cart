import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PALETTE } from "../constants";
import { RootNativeStackScreenProps } from "../types";
import { moderateScale, verticalScale } from "../utils";

const SplashScreen = ({
  navigation,
}: RootNativeStackScreenProps<"SplashScreen">) => {
  useEffect(() => {
    setTimeout(async () => {
      const isLoggedIn = await AsyncStorage.getItem("currentUser");
      navigation.replace(isLoggedIn ? "Drawer" : "Onboarding");
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shopping Cart</Text>
      <ActivityIndicator size={"large"} color={PALETTE.orange} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(48),
  },
  text: {
    color: PALETTE.white,
    fontSize: moderateScale(34),
    marginBottom: verticalScale(12),
  },
});
