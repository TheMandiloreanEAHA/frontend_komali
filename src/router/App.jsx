import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Admin from "../pages/Admin.jsx";
import Sadmin from "../pages/Sadmin.jsx";
import Employee from "../pages/Employee.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="admin" element={<Admin/>}/>
          <Route path="sadmin" element={<Sadmin/>}/>
          <Route path="employee" element={<Employee/>}/>
        </Route>
      </Routes>
    </BrowserRouter> 
  )
};
