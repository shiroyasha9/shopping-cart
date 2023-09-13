import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import SearchIcon from "../assets/images/search_icon.svg";
import { PALETTE } from "../constants";
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
        <SearchIcon height={scale(20)} width={scale(20)} fill={PALETTE.black} />
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
