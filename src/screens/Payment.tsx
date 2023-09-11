import { useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { PrimaryButton } from "../components";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";

type InputProps = {
  placeholder: string;
  style?: TextInputProps["style"];
  containerStyle?: ViewProps["style"];
};

const Input = (props: TextInputProps & InputProps) => {
  const { placeholder, style, containerStyle, ...rest } = props;
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        {...rest}
      />
    </View>
  );
};

const PaymentScreen = () => {
  const cart = useAtomValue(cartAtom);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  return (
    <View style={styles.container}>
      <View style={styles.totalPriceContainer}>
        <Text style={styles.totalLabel}>Payment:</Text>
        <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardTitle}>Lorem</Text>
          <Text style={styles.cardTitle}>Ipsum</Text>
          <Text style={styles.cardTitle}>CARD</Text>
        </View>
        <Input placeholder="1234-5678-9012-3456" />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="19/23"
            containerStyle={{
              width: "40%",
            }}
          />
          <Input
            placeholder="123"
            containerStyle={{
              width: "40%",
            }}
          />
        </View>
      </View>
      <View style={styles.addressContainer}>
        <Text style={[styles.cardTitle, styles.darkTitle]}>Ipsum dolor</Text>
        <Input
          placeholder="John Doe"
          placeholderTextColor={"rgba(0, 0, 0, 0.5)"}
          style={styles.darkInput}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "40%",
            }}
          >
            <Text>Amet</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
              }}
            />
          </View>
          <View
            style={{
              width: "40%",
            }}
          >
            <Text>Lorem</Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
              }}
            />
          </View>
        </View>
      </View>
      <PrimaryButton title="pay" />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 48,
    marginTop: 16,
  },
  totalLabel: {
    fontSize: FONT_SIZE.massive,
    fontWeight: "bold",
    color: PALETTE.blackberry,
  },
  total: {
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: PALETTE.orange,
  },
  cardContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: PALETTE.blackberry,
    borderRadius: 12,
    rowGap: 30,
  },
  cardTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
    color: PALETTE.white,
  },
  inputContainer: {
    rowGap: 2,
  },
  input: {
    fontSize: FONT_SIZE.large,
    color: PALETTE.white,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  darkInput: {
    color: PALETTE.blackberry,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  darkTitle: {
    color: PALETTE.blackberry,
  },
  addressContainer: {
    rowGap: 20,
  },
});
