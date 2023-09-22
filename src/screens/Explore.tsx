import { useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useQuery } from "react-query";
import {
  InvisibleItem,
  PrimaryButton,
  ProductCard,
  SearchBar,
} from "../components";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { BottomTabsScreenProps, Product } from "../types";
import { scale } from "../utils";

const ExploreScreen = ({ navigation }: BottomTabsScreenProps<"Explore">) => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery("products", async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json() as Promise<Product[]>;
  });

  const navigateToWifiListScreen = () => {
    navigation.navigate("WifiList");
  };

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
      <PrimaryButton
        title="Go to Wifi List"
        onPress={navigateToWifiListScreen}
        style={{ marginHorizontal: scale(20) }}
      />
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

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
