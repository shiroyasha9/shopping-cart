import { CartItem, User } from "../types";
import { persistedAtom } from "./helper";

export const cartAtom = persistedAtom<CartItem[]>("cart", []);

export const usersAtom = persistedAtom<User[]>("users", []);

export const currentUserAtom = persistedAtom<User | null>("currentUser", null);
