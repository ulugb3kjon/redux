import { createSlice } from "@reduxjs/toolkit";

const getStoredCars = () => {
  try {
    const stored = localStorage.getItem("cars");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("localStorage parse error:", e);
    localStorage.removeItem("cars"); 
    return [];
  }
};

const cardSlice = createSlice({
  name: "cars",
  initialState: getStoredCars(),
  reducers: {
    addCar: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("cars", JSON.stringify(state));
    },
    editCar: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((car) => car.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        localStorage.setItem("cars", JSON.stringify(state));
      }
    },
    deleteCar: (state, action) => {
      const newState = state.filter((car) => car.id !== action.payload);
      localStorage.setItem("cars", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addCar, editCar, deleteCar } = cardSlice.actions;
export default cardSlice.reducer;