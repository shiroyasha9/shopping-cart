import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/Categories";
import ProductScreen from "../screens/Product";
import ProductsScreen from "../screens/Products";
import { CategoryStackParamList } from "../types";

const Stack = createNativeStackNavigator<CategoryStackParamList>();

function CategoryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Categories"
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default CategoryNavigator;
