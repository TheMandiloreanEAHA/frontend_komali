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
      <div className="h-[75vh] rounded-lg border-4 p-3 border-gray-500/20 grid gap-8">
        <button
          className=" w-3/4 h-18 ml-8 rounded-full bg-uv-blue text-2xl text-white-100"
          type="button"
        >
          Comedor
        </button>
        <button
          className="w-3/4 h-18 ml-8 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
          type="button"
        >
          Alimentos
        </button>
        <button
          className="w-3/4 h-18 ml-8 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
          type="button"
        >
          Empleados
        </button>
        <button
          onClick={deleteSession}
          className="w-3/4 h-18 ml-8 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
          type="button"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }
};
export default AdminOptions;
