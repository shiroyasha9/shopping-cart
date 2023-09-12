import { memo } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { FONT_SIZE, PALETTE } from "../constants";

type RadioTabs = {
  tabName: string;
  onPress: () => void;
  title: string;
};

export type RadioTabsNavigationProps = {
  tabs: RadioTabs[];
  selectedTab: string;
};

const RadioTabsNavigation: React.FC<RadioTabsNavigationProps> = (props) => {
  const { tabs, selectedTab } = props;

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const { onPress, tabName, title } = tab;
        return (
          <TouchableOpacity
            key={tabName}
            onPress={onPress}
            style={{
              width: Dimensions.get("window").width / tabs.length,
            }}
          >
            <View
              style={[
                styles.radioTabContainer,
                selectedTab === tabName
                  ? {
                    borderBottomWidth: 2,
                    borderBottomColor: PALETTE.orange,
                  }
                  : {},
              ]}
            >
              {title && (
                <Text
                  style={[
                    styles.title,
                    {
                      color:
                        selectedTab === tabName
                          ? PALETTE.orange
                          : PALETTE.white,
                    },
                  ]}
                >
                  {title}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(RadioTabsNavigation);

const styles = StyleSheet.create({
  container: {
    marginVertical: verticalScale(8),
    height: verticalScale(56),
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    padding: 6,
  },
  radioTabContainer: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: scale(48),
  },
  title: {
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
