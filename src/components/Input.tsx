import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { FONT_SIZE, PALETTE } from "../constants";

type InputProps = {
  label: string;
  error?: string;
  labelStyle?: TextStyle;
};

export const Input = (props: TextInputProps & InputProps) => {
  const { label, style, labelStyle, error, onChangeText } = props;
  const [hasUserTyped, setHasUserTyped] = useState(false);
  return (
    <View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        {...props}
        onChangeText={(text) => {
          onChangeText?.(text);
          setHasUserTyped(true);
        }}
        style={[styles.input, style]}
      />
      <Text style={styles.error}>{error && hasUserTyped ? error : " "}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
    marginBottom: verticalScale(6),
    marginLeft: scale(12),
    color: PALETTE.blackberry,
  },
  input: {
    backgroundColor: PALETTE.white,
    borderRadius: 48,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    fontSize: FONT_SIZE.medium,
  },
  error: {
    marginTop: verticalScale(4),
    fontSize: FONT_SIZE.tiny,
    fontWeight: "bold",
    color: PALETTE.gray,
    marginLeft: scale(12),
  },
});
