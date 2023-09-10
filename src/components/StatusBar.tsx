import {
  StatusBar as RNStatusBar,
  StatusBarProps as RNStatusBarProps,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

const STATUSBAR_HEIGHT = RNStatusBar.currentHeight;

export const StatusBar = (props: RNStatusBarProps) => {
  const { backgroundColor, ...rest } = props;

  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <RNStatusBar translucent backgroundColor={backgroundColor} {...rest} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
