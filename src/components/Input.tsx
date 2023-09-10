import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";

type InputProps = {
  label: string;
  labelStyle?: TextStyle;
};

export const Input = (props: TextInputProps & InputProps) => {
  const { label, style, labelStyle } = props;
  return (
    <View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput {...props} style={[styles.input, style]} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    marginLeft: 12,
    color: PALETTE.blackberry,
  },
  input: {
    backgroundColor: PALETTE.white,
    borderRadius: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: FONT_SIZE.medium,
  },
});
