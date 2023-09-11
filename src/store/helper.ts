import AsyncStorage from "@react-native-async-storage/async-storage";

import { atomWithStorage, createJSONStorage } from "jotai/utils";

export function persistedAtom<T>(key: string, initialValue: T) {
  return atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => AsyncStorage),
  );
}
