import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";

type QuantityProps = {
  id: number;
};

const Quantity = (props: QuantityProps) => {
  const { id } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.action}>-</Text>
      </TouchableOpacity>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantity}>1</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.action}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  action: { color: PALETTE.blackberry },
  quantityContainer: {
    borderWidth: 1,
    borderColor: PALETTE.blackberry,
    borderRadius: 4,
  },
  quantity: {
    color: PALETTE.blackberry,
    aspectRatio: 1,
    textAlign: "center",
    padding: 2,
    fontSize: FONT_SIZE.small,
  },
});
