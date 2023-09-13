import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { scale, verticalScale } from "react-native-size-matters";
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

  const onCategoryPress = () => {
    navigation.navigate("Products", { category: data.category });
  };

  return (
    <ScrollView
      style={{ flex: 1, margin: 20 }}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity
        style={styles.categoryTitleContainer}
        onPress={onCategoryPress}
      >
        <View style={styles.categoryTitleInnerContainer}>
          <Text style={styles.categoryTitle}>{data.category}</Text>
        </View>
      </TouchableOpacity>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.rating}>
          Rating: {data.rating.rate} / 5 ★ ({data.rating.count} reviews)
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
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: verticalScale(20),
  },
  image: {
    height: scale(250),
    width: scale(250),
    borderRadius: 20,
  },
  categoryTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(16),
  },
  categoryTitleInnerContainer: {
    backgroundColor: PALETTE.orange,
    borderRadius: 20,
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(44),
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
    rowGap: verticalScale(8),
  },
  title: {
    color: PALETTE.blackberry,
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
  },
  description: {
    color: PALETTE.darkGray,
    fontSize: FONT_SIZE.tiny,
  },
  rating: {
    color: PALETTE.black,
  },
  countPriceContainer: {
    marginTop: verticalScale(12),
    alignItems: "center",
    rowGap: verticalScale(12),
  },
});
