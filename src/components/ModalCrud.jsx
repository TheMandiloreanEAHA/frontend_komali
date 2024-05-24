import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";
import React from "react";

const ModalCrud = ({ estado, cambiarEstado, funcion }) => {
  const [diningRoomList, setDiningRoomList] = useState([]);

  useEffect(() => {
    const initDiningRoomList = async () => {
      await getDiningRooms();
    };
    initDiningRoomList();
  }, []); // Dependencias vacías para que se ejecute solo una vez

  const getDiningRooms = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/dining-room/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningRoomList(result.data);
    }
  };

  const [values, setValues] = useState({
    name: "",
    pswd: "",
    pswd2: "",
    diningRoom: "",
  });

  const handleInputOnChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const renderFuncion = () => {
    switch (funcion) {
      case "agregar":
        return (
          <label className="text-2xl mb-7">
            REGISTRO DE NUEVO ADMINISTRADOR LOCAL
          </label>
        );
      case "modificar":
        return (
          <label className="text-2xl mb-7">EDITAR ADMINISTRADOR LOCAL</label>
        );
      case "eliminar":
        return (
          <label className="text-2xl mb-7">ELIMINAR ADMINISTRADOR LOCAL</label>
        );
      default:
        return (
          <label className="text-2xl mb-7">
            REGISTRO DE NUEVO ADMINISTRADOR LOCAL
          </label>
        );
    }
  };

  if (estado) {
    return (
      <div className="fixed inset-0 bg-black-900 bg-opacity-20 backdrop-blur-none flex justify-center items-center">
        <div className="w-6/12 h-4/6 bg-white-100 p-5 rounded-3xl flex flex-col items-center gap-5">
          <div className="w-full flex flex-row-reverse">
            <button
              onClick={() => cambiarEstado(false)}
              className="text-xl text-uv-blue font-semibold"
            >
              X
            </button>
          </div>
          {renderFuncion()}
          <form
            className="flex flex-col items-center w-full gap-y-4"
            onSubmit={handleForm}
          >
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="text"
              name="name"
              value={values.name}
              placeholder="Nombre de usuario"
              onChange={handleInputOnChange}
            />
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="password"
              name="pswd"
              value={values.pswd}
              placeholder="Contraseña"
              onChange={handleInputOnChange}
            />
            <input
              className="border-b-2 border-black-900 text-2xl w-4/6 mb-4"
              type="password"
              name="pswd2"
              value={values.pswd2}
              placeholder="Repita la contraseña"
              onChange={handleInputOnChange}
            />
            <select
              className="border-2 border-black-900 text-2xl w-4/6 mb-4"
              name="diningRoom"
              value={values.diningRoom}
              onChange={handleInputOnChange}
            >
              <option
                value=""
                disabled
                hidden
              >
                Selecciona un comedor
              </option>
              {diningRoomList.length > 0 ? (
                diningRoomList.map((item, index) => (
                  <option
                    key={index}
                    value={item.dining_id}
                  >
                    {item.dining_name}
                  </option>
                ))
              ) : (
                <option disabled>Cargando Datos...</option>
              )}
            </select>
            <button
              type="submit"
              className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default ModalCrud;
