import { ActivityIndicator, View } from "react-native";
import { PALETTE } from "../constants";

type LoadingIndicatorProps = {
  size?: number | "small" | "large";
  color?: string;
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = (props) => {
  const { size = "large", color = PALETTE.orange } = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
