import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Admin from "../pages/Admin.jsx";
import Sadmin from "../pages/Sadmin.jsx";
import Employee from "../pages/Employee.jsx";
import Order from "../pages/Order.jsx";
import ShoppingCart from "../pages/ShoppingCart";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
import WelcomeScreen from "../components/employee/WelcomeScreen.jsx";
import Store from "../components/employee/Store";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="admin" element={<Admin />} />
          <Route path="sadmin" element={<Sadmin />} />
          <Route path="employee" element={<Employee />} />
          <Route path="order" element={<Order />} />
          <Route path="home" element={<Home />}>
            <Route index element={<WelcomeScreen />} />
            <Route path="store" element={<Store />} />
            <Route path="cart" element={<ShoppingCart />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
