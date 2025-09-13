import { configureStore } from "@reduxjs/toolkit";
import carsReducer from "../redux/cardSlice";

export const store = configureStore({
  reducer: {
    cars: carsReducer,
  },
});
