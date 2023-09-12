import { FlatList, StyleSheet, View } from "react-native";
import { verticalScale } from "react-native-size-matters";
import { useQuery } from "react-query";
import { InvisibleItem, ProductCard } from "../components";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { Product } from "../types";

const ExploreScreen = () => {
  const { data, isLoading } = useQuery("products", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
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

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(20),
  },
});
