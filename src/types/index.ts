import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { DrawerScreenProps as RNDrawerScreenProps } from "@react-navigation/drawer";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNativeStackParamList = {
  SplashScreen: undefined;
  Onboarding: undefined;
  Auth: undefined;
  WifiList: undefined;
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
  Category: NavigatorScreenParams<CategoryStackParamList>;
  Cart: undefined;
  Payment: undefined;
};

export type BottomTabsScreenProps<T extends keyof BottomTabsParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, T>,
    DrawerScreenProps<"Main">
  >;

export type CategoryStackParamList = {
  Categories: undefined;
  Products: { category: string };
  Product: { id: number };
};

export type CategoryStackScreenProps<T extends keyof CategoryStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<CategoryStackParamList, T>,
    BottomTabsScreenProps<"Category">
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNativeStackParamList { }
  }
}

export type OnboardingSlideData = {
  readonly title: string;
  readonly subtitle: string;
  readonly Icon: React.ReactNode;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = Omit<Product, "rating" | "category"> & {
  quantity: number;
};

export type User = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};
