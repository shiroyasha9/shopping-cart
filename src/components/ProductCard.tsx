import { Image, StyleSheet, Text, View } from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";
import { Product } from "../types";
import Quantity from "./Quantity";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  return (
    <View style={styles.item}>
      <Text style={styles.title} numberOfLines={1}>
        {product.title}
      </Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Quantity id={product.id} />
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export const InvisibleItem = () => {
  return <View style={[styles.item, styles.itemInvisible]} />;
};

const styles = StyleSheet.create({
  title: {
    color: PALETTE.blackberry,
    fontSize: FONT_SIZE.small,
    fontWeight: "bold",
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.orange,
  },
  item: {
    borderColor: PALETTE.blackberry,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: 12,
    padding: 10,
    rowGap: 12,
  },
  itemInvisible: {
    borderColor: "transparent",
  },
  price: {
    color: PALETTE.orange,
    fontSize: FONT_SIZE.huge,
    fontWeight: "bold",
  },
});
