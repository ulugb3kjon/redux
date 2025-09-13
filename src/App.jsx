import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import Categories from "./pages/categories";
import CategoryDetails from "./pages/category-details";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="categories" element={<Categories />} />
        <Route path="categoryDetails" element={<CategoryDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
