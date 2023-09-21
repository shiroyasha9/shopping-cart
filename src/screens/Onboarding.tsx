import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { OnboardingFlatlist, OnboardingFooter } from "../components";
import { PALETTE } from "../constants";
import { OnboardingSlideData, RootNativeStackScreenProps } from "../types";
import { verticalScale } from "../utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    height: verticalScale(250),
    width: verticalScale(250),
  },
});

const ONBOARDING_DATA: ReadonlyArray<OnboardingSlideData> = [
  {
    title: "BEST PRICES",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Image
        source={require("../assets/images/onboarding_1.png")}
        style={styles.heroImage}
      />
    ),
  },
  {
    title: "BEST OFFERS",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Image
        source={require("../assets/images/onboarding_2.png")}
        style={styles.heroImage}
      />
    ),
  },
  {
    title: "BEST CHOICE",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Image
        source={require("../assets/images/onboarding_3.png")}
        style={styles.heroImage}
      />
    ),
  },
];

const OnboardingScreen = ({
  navigation,
}: RootNativeStackScreenProps<"Onboarding">) => {
  const flatListRef: React.RefObject<FlatList<OnboardingSlideData>> =
    useRef(null);
  const width = Dimensions.get("window").width;
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const goToSlideHandler = (newSlideNumber = activeSlideIndex + 1) => {
    if (newSlideNumber < ONBOARDING_DATA.length) {
      flatListRef.current?.scrollToOffset({
        offset: newSlideNumber * width,
      });
      setActiveSlideIndex(newSlideNumber);
    }
  };

  const goToAuthScreen = () => {
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={PALETTE.blackberry}
      />
      <OnboardingFlatlist
        data={ONBOARDING_DATA}
        activeSlideIndex={activeSlideIndex}
        setActiveSlideIndex={(index: number) => setActiveSlideIndex(index)}
        flatListRef={flatListRef}
      />
      <OnboardingFooter
        onGoToSlide={goToSlideHandler}
        activeSlideIndex={activeSlideIndex}
        numberOfSlides={ONBOARDING_DATA.length}
        onStart={goToAuthScreen}
      />
    </View>
  );
};

export default OnboardingScreen;
