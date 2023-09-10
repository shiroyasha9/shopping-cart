import { StyleSheet, Text, View } from "react-native";
import { FONT_SIZE, PALETTE } from "../constants";
import { PrimaryButton } from "./PrimaryButton";

export interface OnboardingFooterProps {
  activeSlideIndex: number;
  numberOfSlides: number;
  onGoToSlide: (newSlideNumber?: number) => void;
  onStart: () => void;
}

export const OnboardingFooter: React.FC<OnboardingFooterProps> = (props) => {
  const { activeSlideIndex, numberOfSlides } = props;

  return (
    <View style={styles.container}>
      <OnboardingFooterButtons {...props} />
      <Text style={styles.footerText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Text>
      <View style={styles.indicatorContainer}>
        {new Array(numberOfSlides).fill(1).map((_, index) => (
          <View
            style={[
              styles.indicator,
              {
                backgroundColor:
                  activeSlideIndex === index ? PALETTE.orange : PALETTE.white,
              },
            ]}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};

const OnboardingFooterButtons: React.FC<OnboardingFooterProps> = (props) => {
  const { activeSlideIndex, numberOfSlides, onGoToSlide, onStart } = props;

  return (
    <PrimaryButton
      onPress={
        activeSlideIndex < numberOfSlides - 1 ? () => onGoToSlide() : onStart
      }
      title="get started"
      style={styles.footerButtonContainer}
      textStyle={styles.footerButtonText}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 24,
  },
  footerText: { color: "white", fontSize: FONT_SIZE.tiny, marginTop: 16 },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    padding: 16,
  },
  indicator: {
    marginHorizontal: 4,
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  footerButtonContainer: {
    width: "70%",
  },
  footerButtonText: {
    width: "100%",
  },
});
