import { deleteDataLocalStorage } from "../utils/localStorageHelper.js";

const AdminOptions = () => {
  const deleteSession = () => {
    deleteDataLocalStorage("save_user");
    deleteDataLocalStorage("token");
    window.location = "/";
  };

  return (
    <div className="h-auto rounded-lg border-4 p-2 py-4 border-gray-500/20">
      <div className="flex flex-col">
        <button
          className="w-3/4 h-18 ml-8 rounded-full bg-uv-green text-2xl text-white-100 hover:font-bold"
          type="button"
        >
          Administradores
        </button>
        <button
          className="my-4 w-3/4 h-18 ml-8 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
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
};
export default AdminOptions;
