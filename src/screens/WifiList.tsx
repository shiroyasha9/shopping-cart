import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components";
import { PALETTE } from "../constants";
import { RootNativeStackScreenProps } from "../types";
import { scale, verticalScale } from "../utils";
import { WifiModule } from "../utils/modules";

type Wifi = {
  BSSID: string;
  SSID: string;
  capabililties: string;
  frequency: number;
  level: number;
  timestamp: number;
};

const WifiListScreen = ({
  navigation,
}: RootNativeStackScreenProps<"WifiList">) => {
  const [wifiList, setWifiList] = useState<Wifi[]>([]);
  useEffect(() => {
    const init = async () => {
      const wifiList = await WifiModule.loadWifiList();
      console.log(wifiList);
      setWifiList(wifiList);
    };
    init();
  }, []);
  return (
    <View style={styles.container}>
      <PrimaryButton title="Go Back" onPress={() => navigation.goBack()} />
      <FlatList
        data={wifiList}
        contentContainerStyle={
          {
            // flex: 1,
            // padding: 20,
          }
        }
        renderItem={({ item }) => {
          return (
            <View key={item.BSSID} style={styles.item}>
              <Text style={styles.wifiName}>Wifi Name: {item.SSID}</Text>
              <Text style={styles.wifiName}>BSSID: {item.BSSID}</Text>
              <Text style={styles.wifiName}>Frequency: {item.frequency}</Text>
              <Text style={styles.wifiName}>Level: {item.level}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WifiListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: verticalScale(48),
  },
  heroImage: {
    height: verticalScale(250),
    width: verticalScale(250),
  },
  wifiName: {
    color: PALETTE.white,
  },
  item: {
    backgroundColor: PALETTE.orange,
    borderRadius: scale(20),
    padding: scale(20),
    marginVertical: scale(8),
    marginHorizontal: verticalScale(16),
  },
});
