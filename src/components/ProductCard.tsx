import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale } from "../utils";
import { FONT_SIZE, PALETTE } from "../constants";
import { Product } from "../types";
import Quantity from "./Quantity";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const navigation = useNavigation();

  const handleProductPress = () => {
    navigation.navigate("Drawer", {
      screen: "Main",
      params: {
        screen: "Category",
        params: {
          screen: "Product",
          params: {
            id: product.id,
          },
        },
      },
    });
  };

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={handleProductPress}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Quantity
        id={product.id}
        price={product.price}
        title={product.title}
        description={product.description}
        image={product.image}
      />
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
    height: scale(120),
    width: scale(120),
    borderRadius: 20,
  },
  item: {
    borderColor: PALETTE.blackberry,
    borderWidth: 2,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    margin: scale(12),
    padding: scale(10),
    rowGap: scale(12),
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
