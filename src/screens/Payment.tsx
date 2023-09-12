import { useAtom } from "jotai";
import { useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";
import CaretDownIcon from "../assets/images/caret_down_icon.svg";
import { PrimaryButton } from "../components";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";
import { BottomTabsScreenProps } from "../types";

type InputProps = {
  placeholder: string;
  style?: TextInputProps["style"];
  containerStyle?: ViewProps["style"];
};

const SELECT_ITEMS = [
  { label: "Lorem", value: "lorem" },
  { label: "Ipsum", value: "ipsum" },
  { label: "Dolor", value: "dolor" },
  { label: "Sit", value: "sit" },
];

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

const PaymentScreen = ({ navigation }: BottomTabsScreenProps<"Payment">) => {
  const [cart, setCart] = useAtom(cartAtom);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const onPayPress = () => {
    setCart([]);
  };

  const onGoToExplorePress = () => {
    navigation.navigate("Explore");
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.totalLabel}>Your cart is empty</Text>
        <PrimaryButton title="go to home" onPress={onGoToExplorePress} />
      </View>
    );
  }

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
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
          style={styles.darkInput}
        />
        <View style={styles.selectContainer}>
          <View style={styles.select}>
            <RNPickerSelect
              // @ts-ignore
              Icon={() => {
                return <CaretDownIcon height={24} width={24} />;
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: "Lorem",
                value: null,
              }}
              style={{
                inputIOS: { ...styles.input, ...styles.darkInput },
                inputAndroid: {
                  ...styles.input,
                  ...styles.darkInput,
                },
              }}
              onValueChange={(value) => console.log(value)}
              items={SELECT_ITEMS}
            />
          </View>
          <View style={styles.select}>
            <RNPickerSelect
              // @ts-ignore
              Icon={() => {
                return <CaretDownIcon height={24} width={24} />;
              }}
              useNativeAndroidPickerStyle={false}
              placeholder={{
                label: "Lorem",
                value: null,
              }}
              style={{
                inputIOS: { ...styles.input, ...styles.darkInput },
                inputAndroid: {
                  ...styles.input,
                  ...styles.darkInput,
                },
              }}
              onValueChange={(value) => console.log(value)}
              items={SELECT_ITEMS}
            />
          </View>
        </View>
      </View>
      <PrimaryButton title="pay" onPress={onPayPress} />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: scale(20),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: verticalScale(16),
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: scale(48),
    marginTop: verticalScale(16),
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
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(16),
    backgroundColor: PALETTE.blackberry,
    borderRadius: 12,
    rowGap: verticalScale(30),
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
    paddingBottom: moderateVerticalScale(8),
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255, 255, 255, 0.5)",
  },
  select: {
    width: "45%",
  },
  darkInput: {
    color: PALETTE.blackberry,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
  },
  darkTitle: {
    color: PALETTE.blackberry,
  },
  addressContainer: {
    rowGap: verticalScale(16),
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
