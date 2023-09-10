import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps as RNDrawerScreenProps } from "@react-navigation/drawer";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNativeStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList>;
};

export type RootNativeStackScreenProps<
  T extends keyof RootNativeStackParamList,
> = NativeStackScreenProps<RootNativeStackParamList, T>;

export type DrawerParamList = {
  Main: NavigatorScreenParams<BottomTabsParamList>;
};

export type DrawerScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    RNDrawerScreenProps<DrawerParamList, T>,
    RootNativeStackScreenProps<keyof RootNativeStackParamList>
  >;

export type BottomTabsParamList = {
  Explore: undefined;
  Products: undefined;
  Product: undefined;
  Cart: undefined;
  Payment: undefined;
};

export type BottomTabsScreenProps<T extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, T>,
    DrawerScreenProps<"Main">
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackParamList {}
  }
}
