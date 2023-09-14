# Oneture Interview Assignment - React Native Task

This is an interview assignment project for Oneture implemented using React Native. In this project, I have developed a shopping cart application demonstrating my knowledge and proficiency in React Native along with several prominent libraries and packages.

## Packages & Libraries Used
In this project, the following packages and libraries were used to streamline development and offer a robust solution:

- `Jotai`: Utilized for global state management to handle the app's global state efficiently.
- `React Navigation`: Implemented to facilitate seamless navigation within the React Native application.
- `React Query`: Employed for managing asynchronous state to handle asynchronous data fetching gracefully.
- `Zod`: Integrated for validations to ensure data integrity and correctness.

## Potential Optimizations (Out of Scope)
While the current implementation serves the intended purpose, here are a few optimizations that could enhance performance but were deemed out of scope for this assignment:

- Cart State Management:
  - Shifting to an object instead of an array for holding the cart state, beneficial for large-scale applications with numerous items in the cart.
  - Considering the addition of the immer package to achieve O(1) time complexity through mutable state while updating.
- API Calls Optimization:
  - Eliminating the need for individual product API calls by passing necessary data through JSON string route params as it returns the same data as `/products`.
  - Leveraging real APIs to stream in additional details such as reviews while displaying available information immediately.

- Backend Service Enhancements (with Next.js):
  - Implementing caching solutions like Redis or API level caching using Next.js app router to enhance loading times.
  - Syncing cart state across devices through API integrations and database storage, coupled with optimistic updates for improved user experience.

## Testing the Application
To test the application, kindly follow the steps outlined below:

- Installation:
Download the APK from this [link](https://teensy.tech/oneturetask)

- Account Setup:
  - Complete the onboarding screens and navigate to the "Sign Up" section on the Auth screen.
  - Create an account using any dummy data. Note that this data is stored in your device's async storage.
- Usage:
  - Explore the shopping flow to get a hands-on experience of the application.
- Logout:
  - To logout, open the drawer and click on the "Logout" button.
- Returning User:
  - If you wish to revisit, you can login using the same credentials created during the sign-up process.
 
## Screenshots
<img width="708" alt="Screenshot 2023-09-14 at 1 03 42 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/6b23161d-8995-4ce8-b401-24f86d237d4f">
<img width="708" alt="Screenshot 2023-09-14 at 1 03 49 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/77ffa34d-3a03-4dc6-a3a0-89db03aa5746">
<img width="708" alt="Screenshot 2023-09-14 at 1 03 54 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/90e3866d-c527-412f-9a60-374e38a18c11">
<img width="708" alt="Screenshot 2023-09-14 at 1 04 04 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/fe21aae4-f6c8-44f3-aa5b-a8ce2cb72ef3">
<img width="708" alt="Screenshot 2023-09-14 at 1 05 12 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/a486373c-068f-49d7-a54d-8759b5451f61">
<img width="708" alt="Screenshot 2023-09-14 at 1 05 24 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/effb05e7-7bab-4eef-bbcc-01cecaa8ff89">
<img width="708" alt="Screenshot 2023-09-14 at 1 05 32 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/703e3a42-3c33-40e7-a0dd-b0929c8d97e7">
<img width="708" alt="Screenshot 2023-09-14 at 1 05 39 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/0fdd6669-986c-4330-ac81-d80107d36113">
<img width="708" alt="Screenshot 2023-09-14 at 1 06 23 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/b9462df7-ebb1-4895-869b-8305da3ef96f">
<img width="708" alt="Screenshot 2023-09-14 at 1 06 29 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/3988fa8e-5f1b-4d8a-9508-37f6659f2e0b">
<img width="708" alt="Screenshot 2023-09-14 at 1 07 10 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/1dbf2ab2-6170-4c01-8605-3d8fa8f2dbfe">
<img width="708" alt="Screenshot 2023-09-14 at 1 07 14 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/aaee0051-ff53-45bb-bac4-7c481139b5ac">
<img width="708" alt="Screenshot 2023-09-14 at 1 07 23 PM" src="https://github.com/shiroyasha9/ShoppingCart/assets/48734821/e35f02b7-b0d5-49d9-a388-2f62d8c71572">
