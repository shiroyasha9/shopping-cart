import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
          <Pressable
            key={tabName}
            onPress={onPress}
            // @ts-ignore passing strings to width should work, but idk
            style={{
              width: (1 / tabs.length) * 100 + "%",
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
          </Pressable>
        );
      })}
    </View>
  );
};

export default memo(RadioTabsNavigation);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    height: 56,
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
    marginHorizontal: 48,
  },
  title: {
    fontSize: FONT_SIZE.large,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
