import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { PALETTE } from "./src/constants";
import StackNavigator from "./src/navigation/StackNavigator";
import ToastComponent from "./src/components/Toast/Toast";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" backgroundColor={PALETTE.orange} />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
      <ToastComponent />
    </QueryClientProvider>
  );
}

export default App;
