import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
} from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";
import { scale, verticalScale } from "../utils";

type InputProps = {
  label?: string;
  error?: string;
  Icon?: React.ReactNode;
  labelStyle?: TextStyle;
  containerStyle?: ViewProps["style"];
};

export const Input = (props: TextInputProps & InputProps) => {
  const {
    Icon,
    label,
    style,
    labelStyle,
    error,
    containerStyle,
    onChangeText,
  } = props;
  const [hasUserTyped, setHasUserTyped] = useState(false);
  return (
    <View>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={[styles.innerContainer, containerStyle]}>
        <TextInput
          placeholderTextColor={PALETTE.darkGray}
          {...props}
          onChangeText={(text) => {
            onChangeText?.(text);
            setHasUserTyped(true);
          }}
          style={[styles.input, style]}
        />
        {Icon && <View style={{ marginRight: scale(12) }}>{Icon}</View>}
      </View>
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
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    color: PALETTE.black,
    fontSize: FONT_SIZE.medium,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: PALETTE.white,
    borderRadius: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  error: {
    marginTop: verticalScale(4),
    fontSize: FONT_SIZE.tiny,
    fontWeight: "bold",
    color: PALETTE.gray,
    marginLeft: scale(12),
  },
});
