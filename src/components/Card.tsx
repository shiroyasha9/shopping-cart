import { StyleSheet, View, ViewProps } from "react-native";
import { PALETTE } from "../constants";

export const Card = (props: ViewProps) => {
  const { style, children } = props;
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: PALETTE.orange,
    borderRadius: 20,
    rowGap: 20,
  },
});
