import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card, Input, PrimaryButton } from "../components";
import RadioTabsNavigation from "../components/RadioTabsNavigaton";
import { FONT_SIZE, PALETTE } from "../constants";
import { RootNativeStackScreenProps } from "../types";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card>
      <Input
        label="E-mail"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
    </Card>
  );
};

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card>
      <Input
        label="Your name"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Phone number"
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Input
        label="E-mail"
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
    </Card>
  );
};

const AuthScreen = ({ navigation }: RootNativeStackScreenProps<"Auth">) => {
  const [selectedTab, setSelectedTab] = useState<"LOGIN" | "SIGNUP">("LOGIN");

  const handleSubmit = () => {
    navigation.navigate("Drawer", {
      screen: "Main",
      params: {
        screen: "Explore",
      },
    });
  };
  return (
    <View style={styles.container}>
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
      {selectedTab === "LOGIN" ? <LoginForm /> : <SignupForm />}
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
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 72,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: PALETTE.blackberry,
  },
  disclaimerText: {
    color: PALETTE.white,
    fontSize: FONT_SIZE.tiny,
    textAlign: "center",
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
