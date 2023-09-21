import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "../utils";
import { useQuery } from "react-query";
import { InvisibleItem, ProductCard, SearchBar } from "../components";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { FONT_SIZE, PALETTE } from "../constants";
import { CategoryStackScreenProps, Product } from "../types";

const ProductsScreen = ({ route }: CategoryStackScreenProps<"Products">) => {
  const [search, setSearch] = useState("");
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

  const filteredData = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.filter((item) => {
      return item.title.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.categoryTitleContainer}>
        <View style={styles.categoryTitleInnerContainer}>
          <Text style={styles.categoryTitle}>{category}</Text>
        </View>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          return (
            <>
              <ProductCard product={item} />
              {index === filteredData.length - 1 && index % 2 === 0 && (
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
    flex: 1,
  },
  categoryTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  categoryTitleInnerContainer: {
    backgroundColor: PALETTE.orange,
    borderRadius: 20,
    paddingVertical: verticalScale(10),
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
});
