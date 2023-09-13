import { z } from "zod";

const isNumber = (value: string) => {
  return value.match(/^[0-9]+$/) !== null;
};

export const loginFormValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const signupFormValidator = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .refine((value) => {
      return (
        isNumber(value),
        { message: "Phone number must be a valid phone number" }
      );
    }),
});

export const paymentFormValidator = z.object({
  cardNumber: z
    .string()
    .length(16, { message: "Card number must be 16 characters long" })
    .refine((value) => {
      return (
        isNumber(value), { message: "Card number must be a valid card number" }
      );
    }),
  expiryDate: z
    .string()
    .length(4, { message: "Expiry date must be 4 characters long" })
    .refine((value) => {
      return (
        isNumber(value), { message: "Expiry date must be a valid expiry date" }
      );
    }),
  cvv: z
    .string()
    .length(3, { message: "CVV must be 3 characters long" })
    .refine((value) => {
      return isNumber(value), { message: "CVV must be a valid CVV" };
    }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  firstSelect: z.string(),
  secondSelect: z.string(),
});
