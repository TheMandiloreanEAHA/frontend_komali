import { crudContext } from "../pages/Admin";
import { useState, useContext } from "react";

const NavBarCrud = () => {
  const { modal, action, row, category } = useContext(crudContext);
  const [isModalOpen, setIsModalOpen] = modal;
  const [selectedAction, setSelectedAction] = action;
  const [selectedRow, setSelectedRow] = row;

  const onSetSelectedAction = (accion) => {
    if (accion == "modificar" || accion == "eliminar") {
      if (selectedRow !== "") {
        //Si se edita y/o modifica, verifica que haya una fila seleccionada
        setIsModalOpen(true);
        setSelectedAction(accion);
      } else {
        //Caso contrario, informa al usuario
        console.log("No hay una fila seleccionada");
      }
    } else {
      setIsModalOpen(true);
      setSelectedAction(accion);
    }
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
