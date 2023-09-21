import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "../utils";
import { FONT_SIZE, PALETTE } from "../constants";
import { OnboardingSlideData } from "../types";

type OnboardingFlatlistProps = {
  data: readonly any[];
  activeSlideIndex: number;
  setActiveSlideIndex: (index: number) => void;
  flatListRef: React.RefObject<FlatList<OnboardingSlideData>>;
};

const width = Dimensions.get("window").width;

export const OnboardingFlatlist: React.FC<OnboardingFlatlistProps> = (
  props,
) => {
  const { data, activeSlideIndex, setActiveSlideIndex, flatListRef } = props;

  const handleMomentumScrollEnd = (e: { nativeEvent: NativeScrollEvent }) => {
    const offset = e.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / width);

    if (newIndex === activeSlideIndex) {
      // No page change, don't do anything
      return;
    }
    setActiveSlideIndex(newIndex);
  };

  const renderSlide = ({ item }: { item: OnboardingSlideData }) => {
    return (
      <View style={{ width }}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>{item.Icon}</View>
          <View style={styles.titleContainer}>
            <Text allowFontScaling={false} style={styles.title}>
              {item.title}
            </Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text allowFontScaling={false} style={styles.subtitle}>
              {item.subtitle}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      pagingEnabled
      data={data}
      contentContainerStyle={styles.flatListContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={renderSlide}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      ref={flatListRef}
      bounces={false}
      keyExtractor={(_, index: number) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(64),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(40),
    paddingBottom: verticalScale(16),
  },
  title: {
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: moderateScale(32),
    fontWeight: "bold",
    color: PALETTE.white,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(64),
    paddingBottom: verticalScale(32),
  },
  subtitle: {
    flexWrap: "wrap",
    textAlign: "center",
    fontSize: FONT_SIZE.medium,
    maxWidth: moderateScale(200),
    color: PALETTE.white,
  },
  flatListContainer: {
    alignItems: "center",
  },
});
