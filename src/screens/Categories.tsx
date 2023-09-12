import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import { CategoryCard, InvisibleCategoryItem } from "../components";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { PALETTE } from "../constants";
import { CategoryStackScreenProps } from "../types";

const CategoriesScreen = ({
  navigation,
}: CategoryStackScreenProps<"Categories">) => {
  const { data, isLoading } = useQuery("categories", async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories",
    );
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json() as Promise<string[]>;
  });

  if (!data || isLoading) {
    return <LoadingIndicator />;
  }

  const handleCategoryPress = (category: string) => {
    navigation.navigate("Products", { category });
  };

  return (
    <View>
      <FlatList
        data={data}
        style={styles.container}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <>
              <CategoryCard
                onPress={handleCategoryPress}
                category={item}
                backgroundColor={index % 3 === 0 ? PALETTE.orange : undefined}
              />
              {index === data.length - 1 && index % 2 === 0 && (
                <InvisibleCategoryItem />
              )}
            </>
          );
        }}
        numColumns={2}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
