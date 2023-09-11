import { CartItem } from "../types";
import { persistedAtom } from "./helper";

export const cartAtom = persistedAtom<CartItem[]>("cart", []);
