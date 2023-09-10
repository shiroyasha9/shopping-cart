import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";
import Onboarding1 from "../assets/images/onboarding_1.svg";
import Onboarding2 from "../assets/images/onboarding_2.svg";
import Onboarding3 from "../assets/images/onboarding_3.svg";
import { OnboardingFlatlist, OnboardingFooter } from "../components";
import { PALETTE } from "../constants";
import { OnboardingSlideData, RootNativeStackScreenProps } from "../types";

const ONBOARDING_DATA: ReadonlyArray<OnboardingSlideData> = [
  {
    title: "BEST PRICES",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Onboarding1 height={verticalScale(250)} width={verticalScale(250)} />
    ),
  },
  {
    title: "BEST OFFERS",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Onboarding2 height={verticalScale(250)} width={verticalScale(250)} />
    ),
  },
  {
    title: "BEST CHOICE",
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    Icon: (
      <Onboarding3 height={verticalScale(250)} width={verticalScale(250)} />
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
        onStart={() => navigation.navigate("Auth")}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PALETTE.blackberry,
  },
});
