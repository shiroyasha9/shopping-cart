import { useAtom, useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Toast from "react-native-toast-message";
import { Card, Input, PrimaryButton } from "../components";
import RadioTabsNavigation from "../components/RadioTabsNavigaton";
import { FONT_SIZE, PALETTE } from "../constants";
import { loginFormValidator, signupFormValidator } from "../lib/validators";
import { currentUserAtom, usersAtom } from "../store";
import { RootNativeStackScreenProps, User } from "../types";

const AuthScreen = ({ navigation }: RootNativeStackScreenProps<"Auth">) => {
  const [selectedTab, setSelectedTab] = useState<"LOGIN" | "SIGNUP">("LOGIN");
  const setCurrentUser = useSetAtom(currentUserAtom);
  const [users, setUsers] = useAtom(usersAtom);
  const [form, setForm] = useState<User>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const handleSubmit = () => {
    if (selectedTab === "LOGIN") {
      const user = users.find(
        (user) => user.email === form.email && user.password === form.password,
      );
      if (!user) {
        Toast.show({
          position: "bottom",
          type: "error",
          text1: "Invalid credentials",
          text2: "Please check your email and password",
        });
        return;
      }
      setCurrentUser(user);
    } else if (selectedTab === "SIGNUP") {
      setUsers([...users, form]);
      setCurrentUser(form);
    }
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Drawer",
          params: {
            screen: "Main",
            params: {
              screen: "Explore",
            },
          },
        },
      ],
    });
  };

  const errors = useMemo(() => {
    const validator =
      selectedTab === "LOGIN" ? loginFormValidator : signupFormValidator;

    const defaultErrors: {
      name: string | undefined;
      email: string | undefined;
      phoneNumber: string | undefined;
      password: string | undefined;
    } = {
      name: undefined,
      email: undefined,
      phoneNumber: undefined,
      password: undefined,
    };

    const validation = validator.safeParse(form);
    if (validation.success === true) {
      return defaultErrors;
    }

    const flattenedErrors = validation.error.flatten().fieldErrors;
    return {
      ...defaultErrors,
      ...Object.fromEntries(
        Object.entries(flattenedErrors).map(([key, value]) => [
          key,
          value?.[0],
        ]),
      ),
    };
  }, [form, selectedTab]);

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
              value={form.name}
              onChangeText={(name) => setForm({ ...form, name })}
              autoCorrect={false}
              error={errors.name}
            />
            <Input
              label="Phone number"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
              keyboardType="phone-pad"
              error={errors.phoneNumber}
            />
          </>
        ) : null}
        <Input
          label="E-mail"
          placeholder="E-mail"
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />
        <Input
          label="Password"
          placeholder="Password"
          value={form.password}
          onChangeText={(password) => setForm({ ...form, password })}
          secureTextEntry
          error={errors.password}
        />
      </Card>
      <View>
        <PrimaryButton
          title={selectedTab === "LOGIN" ? "Login" : "Sign up"}
          onPress={handleSubmit}
          disabled={Object.values(errors).some((error) => error !== undefined)}
        />
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
    marginVertical: verticalScale(24),
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
    marginTop: verticalScale(12),
  },
});
