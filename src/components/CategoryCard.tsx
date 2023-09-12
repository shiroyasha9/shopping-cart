import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONT_SIZE, PALETTE } from "../constants";

type CategoryCardProps = {
  category: string;
  onPress: (category: string) => void;
  backgroundColor?: string;
};

export const CategoryCard = (props: CategoryCardProps) => {
  const { category, onPress, backgroundColor } = props;

  return (
    <TouchableOpacity
      onPress={() => onPress(category)}
      style={[styles.item, backgroundColor ? { backgroundColor } : {}]}
    >
      <Text style={styles.title} numberOfLines={1}>
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export const InvisibleCategoryItem = () => {
  return <View style={[styles.item, styles.itemInvisible]} />;
};

const styles = StyleSheet.create({
  title: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.small,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  item: {
    backgroundColor: PALETTE.blackberry,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    margin: 12,
    width: Dimensions.get("window").width / 2 - 24,
    height: Dimensions.get("window").width / 2 - 24,
  },
  itemInvisible: {
    backgroundColor: "transparent",
  },
});
