import React from "react";

const ModalCrud = ({ estado, cambiarEstado, funcion }) => {
  const renderFuncion = () => {
    switch (funcion) {
      case "agregar":
        return (
          <label className="text-2xl  mb-10">
            REGISTRO DE NUEVO ADMINISTRADOR LOCAL
          </label>
        );
      case "modificar":
        return (
          <label className="text-2xl  mb-10">EDITAR ADMINISTRADOR LOCAL</label>
        );
      case "eliminar":
        return (
          <label className="text-2xl  mb-10">
            ELIMINAR ADMINISTRADOR LOCAL
          </label>
        );
    }
    return (
      <label className="text-2xl  mb-10">
        REGISTRO DE NUEVO ADMINISTRADOR LOCAL
      </label>
    );
  };

  if (estado) {
    return (
      <>
        <div className="fixed inset-0 bg-black-900 bg-opacity-20 backdrop-blur-none flex justify-center items-center">
          <div className="w-6/12 h-4/6 bg-white-100 p-5 rounded-lg flex flex-col items-center gap-5">
            <div className="w-full flex flex-row-reverse">
              <button
                onClick={() => cambiarEstado(false)}
                className="text-xl text-uv-blue font-semibold"
              >
                X
              </button>
            </div>
            {renderFuncion()}
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="text"
              placeholder="Nombre de usuario"
            />
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="text"
              placeholder="Contraseña"
            />
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="text"
              placeholder="Repita la contraseña"
            />
            <select
              className="border-2 border-black-900 text-2xl w-4/6 mb-4"
              name="comedores"
              id="comedor"
              defaultValue=""
            >
              <option
                className="text-gray-500"
                value=""
                disabled
                hidden
              >
                Selecciona un comedor
              </option>
              <option value="comedor1">Comedor 1</option>
              <option value="comedor2">Comedor 2</option>
              <option value="comedor3">Comedor 3</option>
            </select>
            <button
              onClick={() => cambiarEstado(false)}
              className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
              type="button"
            >
              Agregar
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default ModalCrud;
