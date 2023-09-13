import { ActivityIndicator, StyleSheet, View, ViewProps } from "react-native";
import { PALETTE } from "../constants";

type LoadingIndicatorProps = {
  size?: number | "small" | "large";
  color?: string;
  style?: ViewProps["style"];
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
  const { size = "large", style, color = PALETTE.orange } = props;
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
