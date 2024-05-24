import { useState } from "react";
import { deleteDataLocalStorage } from "../utils/localStorageHelper.js";

const AdminOptions = ({ userType, btnSeleccionado }) => {
  const deleteSession = () => {
    deleteDataLocalStorage("save_user");
    deleteDataLocalStorage("token");
    window.location = "/";
  };

  const [selectedBtn, setSelectedBtn] = useState("admin");

  const handleButtonClicked = (btnId) => {
    setSelectedBtn(btnId);
    btnSeleccionado(btnId);
  };

  if (userType === "admin") {
    return (
      <div className="h-auto rounded-lg border-4 p-2 py-4 border-gray-500/20">
        <div className="flex flex-col">
          <button
            onClick={() => handleButtonClicked("admin")}
            className={`w-3/4 h-18 ml-8 rounded-full ${selectedBtn === "admin" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Administradores
          </button>
          <button
            onClick={() => handleButtonClicked("comedores")}
            className={`my-4 w-3/4 h-18 ml-8 rounded-full  ${selectedBtn === "comedores" ? "bg-uv-green" : "bg-uv-blue"} text-2xl text-white-100 hover:font-bold`}
            type="button"
          >
            Comedores
          </button>
          <button
            className="my-4 w-3/4 h-18 ml-8 rounded-full bg-gray-500/90 text-2xl text-white-100 cursor-not-allowed"
            type="button"
          >
            Comedor
          </button>
          <button
            className="my-4 w-3/4 h-18 ml-8 rounded-full bg-gray-500/90 text-2xl text-white-100 cursor-not-allowed"
            type="button"
          >
            Alimentos
          </button>
          <button
            className="my-4 w-3/4 h-18 ml-8 rounded-full bg-gray-500/90 text-2xl text-white-100 cursor-not-allowed"
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
