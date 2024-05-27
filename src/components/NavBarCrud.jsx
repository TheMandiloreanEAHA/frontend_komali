import { crudContext } from "../pages/Admin";
import { useContext } from "react";

const NavBarCrud = () => {
  const { modal, action } = useContext(crudContext);
  const [isModalOpen, setIsModalOpen] = modal;
  const [selectedAction, setSelectedAction] = action;

  const onSetSelectedAction = (accion) => {
    setIsModalOpen(true);
    setSelectedAction(accion);
    console.log(accion);
  };

  return (
    <div class="grid grid-cols-6 gap-4 mb-4">
      <button
        onClick={() => onSetSelectedAction("agregar")}
        className="h-10 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Nuevo
      </button>
      <button
        onClick={() => onSetSelectedAction("modificar")}
        className=" h-10 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Editar
      </button>
      <button
        onClick={() => onSetSelectedAction("eliminar")}
        className=" h-10 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Eliminar
      </button>
      <input
        type="text"
        id="buscar"
        placeholder="Nombre empleado"
        className="col-span-3 h-10 rounded-full border-2 border-uv-blue p-4"
      />
    </div>
  );
};

export default NavBarCrud;
