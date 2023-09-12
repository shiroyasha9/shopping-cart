import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import CartIcon from "../assets/images/cart_icon.svg";
import { PrimaryButton } from "../components";
import Quantity from "../components/Quantity";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";
import { BottomTabsScreenProps } from "../types";

const CartScreen = (props: BottomTabsScreenProps<"Cart">) => {
  const cart = useAtomValue(cartAtom);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const onNextPress = () => {
    props.navigation.navigate("Payment");
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <View>
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCount}>{cart.length}</Text>
            </View>
            <CartIcon height={100} width={100} fill={PALETTE.blackberry} />
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{}}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.cartItemContainer}>
                <View style={styles.cartItemFirstRowContainer}>
                  <Text numberOfLines={1} style={styles.cartItemTitle}>
                    {item.title}
                  </Text>
                  <Quantity
                    id={item.id}
                    price={item.price}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    quantity={item.quantity}
                  />
                  <Text style={styles.cartItemPrice}>
                    ${item.price.toFixed(2)}
                  </Text>
                </View>
                <Text numberOfLines={2} style={styles.cartItemDescription}>
                  {item.description}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.primaryButtonContainer}>
        <PrimaryButton
          title="next"
          style={styles.primaryButton}
          onPress={onNextPress}
          disabled={cart.length === 0}
        />
      </View>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 16,
  },
  totalPriceContainer: { rowGap: 4 },
  totalLabel: {
    fontSize: FONT_SIZE.huge,
    fontWeight: "bold",
    color: PALETTE.blackberry,
  },
  total: {
    fontSize: FONT_SIZE.massive,
    fontWeight: "bold",
    color: PALETTE.orange,
  },
  cartCountContainer: {
    position: "absolute",
    top: 12,
    right: -5,
    backgroundColor: PALETTE.orange,
    borderRadius: 50,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartCount: {
    fontSize: FONT_SIZE.huge,
    color: PALETTE.offWhite,
    fontWeight: "bold",
  },
  cartItemContainer: {
    marginVertical: 24,
    rowGap: 8,
  },
  cartItemFirstRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cartItemTitle: {
    width: 200,
    fontSize: FONT_SIZE.medium,
    fontWeight: "bold",
    color: PALETTE.blackberry,
  },
  cartItemPrice: {
    fontWeight: "bold",
    color: PALETTE.blackberry,
  },
  cartItemDescription: {
    fontSize: FONT_SIZE.tiny,
    color: PALETTE.blackberry,
  },
  primaryButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  primaryButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: Dimensions.get("window").width / 2,
  },
});
