import { Image, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { LoadingIndicator } from "../components";
import Quantity from "../components/Quantity";
import { FONT_SIZE, PALETTE } from "../constants";
import { CategoryStackScreenProps, Product } from "../types";

const ProductScreen = ({
  navigation,
  route,
}: CategoryStackScreenProps<"Product">) => {
  const { id } = route.params;
  const { data, isLoading } = useQuery(["product", id], async () => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json() as Promise<Product>;
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryTitleContainer}>
        <View style={styles.categoryTitleInnerContainer}>
          <Text style={styles.categoryTitle}>{data.category}</Text>
        </View>
      </View>
      <Image source={{ uri: data.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text>{data.description}</Text>
        <Text>
          Rating: {data.rating.rate} ({data.rating.count} reviews)
        </Text>
        <View style={styles.countPriceContainer}>
          <Quantity
            id={data.id}
            price={data.price}
            title={data.title}
            description={data.description}
            image={data.image}
          />
          <Text style={styles.price}>${data.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    height: 300,
    width: 300,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETTE.orange,
  },
  categoryTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  categoryTitleInnerContainer: {
    backgroundColor: PALETTE.orange,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryTitle: {
    color: PALETTE.blackberry,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: FONT_SIZE.medium,
  },
  price: {
    color: PALETTE.orange,
    fontSize: FONT_SIZE.huge,
    fontWeight: "bold",
  },
  detailsContainer: {
    rowGap: 12,
  },
  title: {
    color: PALETTE.blackberry,
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
  },
  countPriceContainer: {
    marginTop: 20,
    alignItems: "center",
    rowGap: 12,
  },
});
