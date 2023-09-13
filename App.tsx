import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { QueryClient, QueryClientProvider } from "react-query";
import { PALETTE } from "./src/constants";
import StackNavigator from "./src/navigation/StackNavigator";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor={PALETTE.orange} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
}

export default App;
