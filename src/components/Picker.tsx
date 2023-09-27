import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { PALETTE } from "../constants";
import { scale, verticalScale } from "../utils";

type PickerProps = {
  value: string | null;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
};

const Picker = (props: PickerProps) => {
  const { value, onValueChange, placeholder, options } = props;
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectedItemContainer}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text style={{ marginLeft: 6 }}>
          {value ? value : placeholder ? placeholder : "Select a value..."}
        </Text>
        <IoniconsIcon name="chevron-down" size={scale(24)} />
      </TouchableOpacity>
      {open && (
        <ScrollView style={styles.scrollView}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              onPress={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
            >
              <View style={styles.itemContainer}>
                <Text
                  style={{
                    color:
                      value === option.value
                        ? PALETTE.orange
                        : PALETTE.blackberry,
                    padding: scale(4),
                  }}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  selectedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderBottomColor: PALETTE.gray,
    borderRadius: scale(8),
    paddingVertical: scale(8),
    width: "100%",
  },
  scrollView: {
    position: "absolute",
    top: verticalScale(38),
    left: 0,
    right: 0,
    maxHeight: verticalScale(100),
    backgroundColor: PALETTE.white,
    borderRadius: scale(8),
    borderWidth: 2,
    borderColor: PALETTE.gray,
  },
  itemContainer: {
    paddingVertical: verticalScale(4),
  },
});
