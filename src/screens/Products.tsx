import { FlatList, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
import { InvisibleItem, ProductCard } from "../components";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FONT_SIZE, PALETTE } from "../constants";
import { CategoryStackScreenProps, Product } from "../types";

const ProductsScreen = ({
  navigation,
  route,
}: CategoryStackScreenProps<"Products">) => {
  const { category } = route.params;
  const { data, isLoading } = useQuery(["products", category], async () => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`,
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json() as Promise<Product[]>;
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View>
      <View style={styles.categoryTitleContainer}>
        <View style={styles.categoryTitleInnerContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
        </View>
      </View>
      <FlatList
        data={data}
        style={styles.container}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <ProductCard product={item} />
              {index === data.length - 1 && index % 2 === 0 && (
                <InvisibleItem />
              )}
            </>
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default ProductsScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
});
