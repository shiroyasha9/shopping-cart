import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { scale, verticalScale } from "../utils";
import { FONT_SIZE, PALETTE } from "../constants";

type PrimaryButtonProps = {
  title: string;
  icon?: React.ReactNode;
  style?: ViewProps["style"];
  textStyle?: TextProps["style"];
};

export const PrimaryButton: React.FC<PressableProps & PrimaryButtonProps> = (
  props,
) => {
  const {
    title,
    icon,
    onPress,
    disabled,
    style: containerStyle,
    textStyle,
    ...rest
  } = props;

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.container,
          {
            opacity: pressed ? 0.5 : 1,
            backgroundColor: disabled ? PALETTE.gray : PALETTE.orange,
          },
          containerStyle,
        ]}
        disabled={disabled}
        {...rest}
      >
        {icon && icon}
        <Text
          style={[styles.text, { marginLeft: icon ? scale(12) : 0 }, textStyle]}
        >
          {title}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(24),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  text: {
    color: "white",
    fontSize: FONT_SIZE.massive,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
