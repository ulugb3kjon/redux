import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cars");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("localStorage error:", err);
    return [];
  }
};

const saveToLocalStorage = (data) => {
  try {
    localStorage.setItem("cars", JSON.stringify(data));
  } catch (err) {
    console.error("localStorage error:", err);
  }
};

const carsSlice = createSlice({
  name: "cars",
  initialState: loadFromLocalStorage(),
  reducers: {
    addCar: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    editCar: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.findIndex((car) => car.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updates };
        saveToLocalStorage(state);
      }
    },
    deleteCar: (state, action) => {
      const newState = state.filter((car) => car.id !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    resetCars: () => {
      localStorage.removeItem("cars");
      return [];
    },
  },
});

export const { addCar, editCar, deleteCar, resetCars } = carsSlice.actions;
export default carsSlice.reducer;
