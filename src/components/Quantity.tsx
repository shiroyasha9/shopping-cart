import { useAtom } from "jotai";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";
import { cartAtom } from "../store";
import { CartItem } from "../types";

type QuantityProps = Omit<CartItem, "quantity"> & {
  quantity?: number;
};

const Quantity = (props: QuantityProps) => {
  const { id, price, title, description, image, quantity } = props;
  const [cart, setCart] = useAtom(cartAtom);

  const handleIncrement = () => {
    void setCart(async (prev) => {
      prev = await prev;
      let found = false;

      const updatedCart = prev.map((item) => {
        if (item.id === id) {
          found = true;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      if (!found) {
        updatedCart.push({
          id,
          price,
          title,
          description,
          image,
          quantity: 1,
        });
      }

      return updatedCart;
    });
  };

  const handleDecrement = () => {
    void setCart(async (prev) => {
      prev = await prev;

      return prev
        .map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: Math.max(0, item.quantity - 1),
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const quantityInCart = useMemo(() => {
    return quantity ?? cart.find((item) => id === item.id)?.quantity ?? 0;
  }, [cart, id, quantity]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDecrement}>
        <Text style={styles.action}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>{quantityInCart}</Text>
      </View>
      <TouchableOpacity onPress={handleIncrement}>
        <Text style={styles.action}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  action: { color: PALETTE.blackberry },
  quantityContainer: {
    borderWidth: 1,
    borderColor: PALETTE.blackberry,
    borderRadius: 4,
  },
  quantity: {
    color: PALETTE.blackberry,
    aspectRatio: 1,
    textAlign: "center",
    padding: 2,
    fontSize: FONT_SIZE.small,
  },
});
