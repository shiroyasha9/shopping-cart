import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { PALETTE } from "./src/constants";
import StackNavigator from "./src/navigation/StackNavigator";

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={PALETTE.orange} />
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;
