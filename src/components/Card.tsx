import { StyleSheet, View, ViewProps } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { PALETTE } from "../constants";

export const Card = (props: ViewProps) => {
  const { style, children } = props;
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(24),
    backgroundColor: PALETTE.orange,
    borderRadius: 20,
    rowGap: verticalScale(20),
  },
});
