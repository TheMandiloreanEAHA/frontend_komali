import { crudContext } from "../pages/Admin";
import { useContext } from "react";

const NavBarCrud = () => {
  const { modal, action, row, modalWarn } = useContext(crudContext);
  const [isModalOpen, setIsModalOpen] = modal;
  const [selectedAction, setSelectedAction] = action;
  const [selectedRow, setSelectedRow] = row;
  const [isModalWarnOpen, setIsModalWarnOpen] = modalWarn;

  const onSetSelectedAction = (accion) => {
    if (accion == "modificar" || accion == "eliminar") {
      if (selectedRow !== "") {
        //Si se edita y/o modifica, verifica que haya una fila seleccionada
        setIsModalOpen(true);
        setSelectedAction(accion);
      } else {
        //Caso contrario, informa al usuario
        setIsModalWarnOpen(!isModalWarnOpen);
      }
    } else {
      setIsModalOpen(true);
      setSelectedAction(accion);
    }
  };

  return (
    <div className="grid grid-cols-3 justify-items-center gap-20 mb-4">
      <button
        onClick={() => onSetSelectedAction("agregar")}
        className="h-14 w-9/12 rounded-full bg-uv-blue text-3xl text-white-100 hover:font-bold"
        type="button"
      >
        Nuevo
      </button>
      <button
        onClick={() => onSetSelectedAction("modificar")}
        className=" h-14 w-9/12 rounded-full bg-uv-blue text-3xl text-white-100 hover:font-bold"
        type="button"
      >
        Editar
      </button>
      <button
        onClick={() => onSetSelectedAction("eliminar")}
        className=" h-14 w-9/12 rounded-full bg-uv-blue text-3xl text-white-100 hover:font-bold"
        type="button"
      >
        Eliminar
      </button>
      {/* <input
        type="text"
        id="buscar"
        placeholder="Nombre empleado"
        className="col-span-3 h-10 rounded-full border-2 border-uv-blue p-4"
      /> */}
    </div>
  );
};

export default NavBarCrud;
