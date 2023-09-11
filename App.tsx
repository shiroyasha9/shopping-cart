import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { PALETTE } from "./src/constants";
import StackNavigator from "./src/navigation/StackNavigator";

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={PALETTE.orange} />
        <StackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
