import { useState } from "react";
import { deleteDataLocalStorage } from "../utils/localStorageHelper.js";

const AdminOptions = ({ userType, setSelectedCategory, selectedCategory }) => {
  const deleteSession = () => {
    deleteDataLocalStorage("save_user");
    deleteDataLocalStorage("token");
    window.location = "/";
  };

  const handleButtonClicked = (btnId) => {
    setSelectedCategory(btnId);
  };

  if (userType === "admin") {
    return (
      <div className="relative w-full h-full rounded-3xl text-white-100 font-bold text-2xl text-center bg-white-100">
        <div className="grid gap-6 p-4">
          <button
            onClick={() => handleButtonClicked("admin")}
            className={`w-full py-4 rounded-full ${selectedCategory === "admin" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Administradores
          </button>
          <button
            onClick={() => handleButtonClicked("comedores")}
            className={`w-full py-4 rounded-full  ${selectedCategory === "comedores" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Comedores
          </button>
        </div>
        <button className="absolute bottom-0 w-full flex justify-center items-center p-6">
          <div
            onClick={deleteSession}
            className=" bg-red-700 h-16 rounded-full w-full flex justify-center items-center"
          >
            Cerrar sesión
          </div>
        </button>
      </div>
    );
  } else {
    return (
      <div className="relative w-full h-full rounded-3xl text-white-100 font-bold text-2xl text-center bg-white-100">
        <div className="grid gap-6 p-4">
          <button
            onClick={() => handleButtonClicked("comedor")}
            className={`w-full py-4 rounded-full ${selectedCategory === "comedor" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Comedor
          </button>
          <button
            onClick={() => handleButtonClicked("productos")}
            className={`w-full py-4 rounded-full  ${selectedCategory === "productos" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Productos
          </button>
          <button
            onClick={() => handleButtonClicked("empleados")}
            className={`w-full py-4 rounded-full  ${selectedCategory === "empleados" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Empleados
          </button>
        </div>
        <button className="absolute bottom-0 w-full flex justify-center items-center p-6">
          <div
            onClick={deleteSession}
            className=" bg-red-700 h-16 rounded-full w-full flex justify-center items-center"
          >
            Cerrar sesión
          </div>
        </button>
      </div>
    );
  }
};
export default AdminOptions;
