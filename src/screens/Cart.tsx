import { useAtomValue } from "jotai";
import { useMemo } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { PrimaryButton } from "../components";
import Quantity from "../components/Quantity";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";
import { BottomTabsScreenProps } from "../types";
import { scale, verticalScale } from "../utils";

const CartScreen = (props: BottomTabsScreenProps<"Cart">) => {
  const { navigation } = props;
  const cart = useAtomValue(cartAtom);

  const totalPrice = useMemo(() => {
    return cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }, [cart]);

  const onNextPress = () => {
    navigation.navigate("Payment");
  };

  const onGoToExplorePress = () => {
    navigation.navigate("Explore");
  };

  const onProductPress = (id: number) => {
    navigation.navigate("Category", {
      screen: "Product",
      params: {
        id,
      },
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.totalContainer}>
          <View>
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCount}>{cart.length}</Text>
            </View>
            <IoniconsIcon
              name="cart-outline"
              size={scale(100)}
              color={PALETTE.blackberry}
            />
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.total}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.totalLabel}>Your cart is empty</Text>
            <PrimaryButton title="go to home" onPress={onGoToExplorePress} />
          </View>
        ) : (
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{}}
            renderItem={({ item }) => {
              return (
                <View style={styles.cartItemContainer}>
                  <View style={styles.cartItemFirstRowContainer}>
                    <TouchableOpacity onPress={() => onProductPress(item.id)}>
                      <Text numberOfLines={1} style={styles.cartItemTitle}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.cartFirstRowInnerContainer}>
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
                  </View>
                  <Text numberOfLines={2} style={styles.cartItemDescription}>
                    {item.description}
                  </Text>
                </View>
              );
            }}
          />
        )}
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
    margin: scale(20),
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: verticalScale(16),
  },
  totalPriceContainer: {
    rowGap: 4,
  },
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
    top: scale(12),
    right: scale(-5),
    backgroundColor: PALETTE.orange,
    borderRadius: 50,
    width: scale(36),
    height: scale(36),
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
    marginVertical: verticalScale(24),
    rowGap: verticalScale(8),
  },
  cartItemFirstRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  cartFirstRowInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: scale(12),
  },
  cartItemTitle: {
    width: Dimensions.get("window").width / 2,
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
    marginBottom: verticalScale(20),
  },
  primaryButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    width: Dimensions.get("window").width / 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: verticalScale(16),
  },
});
