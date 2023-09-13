import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { Card, Input, PrimaryButton } from "../components";
import RadioTabsNavigation from "../components/RadioTabsNavigaton";
import { FONT_SIZE, PALETTE } from "../constants";
import { RootNativeStackScreenProps } from "../types";

const AuthScreen = ({ navigation }: RootNativeStackScreenProps<"Auth">) => {
  const [selectedTab, setSelectedTab] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Drawer", {
      screen: "Main",
      params: {
        screen: "Explore",
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <RadioTabsNavigation
        selectedTab={selectedTab}
        tabs={[
          {
            tabName: "LOGIN",
            title: "Login",
            onPress: () => setSelectedTab("LOGIN"),
          },
          {
            tabName: "SIGNUP",
            title: "Sign Up",
            onPress: () => setSelectedTab("SIGNUP"),
          },
        ]}
      />
      <Card>
        {selectedTab === "SIGNUP" ? (
          <>
            <Input
              label="Your name"
              placeholder="Name"
              value={name}
              onChangeText={setName}
              autoCorrect={false}
            />
            <Input
              label="Phone number"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </>
        ) : null}
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </Card>
      <View>
        {selectedTab === "LOGIN" ? (
          <PrimaryButton title="Login" onPress={handleSubmit} />
        ) : (
          <PrimaryButton title="Sign up" onPress={handleSubmit} />
        )}
        <Text style={styles.disclaimerText}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Reprehenderit aliquid quis sunt
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: verticalScale(36),
    marginHorizontal: scale(24),
    justifyContent: "space-between",
    alignItems: "center",
    rowGap: verticalScale(24),
  },
  disclaimerText: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.tiny,
    textAlign: "center",
    paddingHorizontal: scale(24),
    marginTop: verticalScale(24),
  },
});
