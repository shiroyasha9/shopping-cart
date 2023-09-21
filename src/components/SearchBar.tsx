import { StyleSheet } from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import { PALETTE } from "../constants";
import { scale, verticalScale } from "../utils";
import { Input } from "./Input";

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export const SearchBar = (props: SearchBarProps) => {
  const { value, onChangeText } = props;

  return (
    <Input
      placeholder="Search"
      value={value}
      onChangeText={onChangeText}
      containerStyle={styles.input}
      Icon={
        <IoniconsIcon name="search" size={scale(20)} color={PALETTE.black} />
      }
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: verticalScale(20),
    borderWidth: 1,
    borderColor: PALETTE.black,
    marginHorizontal: scale(20),
  },
});
