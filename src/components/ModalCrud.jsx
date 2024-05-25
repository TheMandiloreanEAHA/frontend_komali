import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet, axiosPost } from "../utils/axiosHelper";

import React from "react";
import ModalAux from "./ModalAux";

const ModalCrud = ({ estado, cambiarEstado, funcion }) => {
  const [diningRoomList, setDiningRoomList] = useState([]);
  const [isActive, setisActive] = useState(false);
  const [motivo, setmotivo] = useState("success");
  const [msj, setMsj] = useState("");

  const initialFormValues = {
    name: "",
    pswd: "",
    pswd2: "",
    userType: "",
    diningRoom: "",
  };

  const [values, setValues] = useState(initialFormValues);

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

  const createUser = async (values) => {
    if (
      values.name === "" ||
      values.pswd === "" ||
      values.pswd2 === "" ||
      values.user_type === "" ||
      values.diningRoom === ""
    ) {
      setisActive(true);
      setmotivo("missing");
    } else {
      if (values.pswd !== values.pswd2) {
        setisActive(true);
        setmotivo("missing");
        setMsj("La contraseña debe ser la misma en ambos campos");
      } else {
        const params = {
          user_name: values.name,
          user_pass: values.pswd,
          user_type: values.userType,
          dining_room_id: values.diningRoom,
        };
        const token = getDataLocalStorage("token");
        const url = `http://127.0.0.1:8000/create`;
        const result = await axiosPost(url, params, token);
        if (result !== undefined) {
          if (!result.data.error) {
            console.log("Usuario Agregado");
            setmotivo("success");
            setisActive(true);
          }
        } else {
          setmotivo("missing");
          setMsj(
            "La contraseña debe tener al menos 8 caracteres, una mayúscula, una mínuscula y un numero"
          );
          setisActive(true);
        }
      }
    }
  };

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
    createUser(values);
  };

  const handleCloseModal = () => {
    setValues(initialFormValues);
    cambiarEstado(false);
  };

  const renderFuncion = () => {
    switch (funcion) {
      case "agregar":
        return (
          <label className="text-2xl mb-4">
            REGISTRO DE NUEVO ADMINISTRADOR LOCAL
          </label>
        );
      case "modificar":
        return (
          <label className="text-2xl mb-4">EDITAR ADMINISTRADOR LOCAL</label>
        );
      case "eliminar":
        return (
          <label className="text-2xl mb-4">ELIMINAR ADMINISTRADOR LOCAL</label>
        );
      default:
        return (
          <label className="text-2xl mb-4">REGISTRO DE NUEVOS DATOS</label>
        );
    }
  };

  if (estado) {
    return (
      <>
        <div className="fixed inset-0 bg-black-900 bg-opacity-20 backdrop-blur-none flex justify-center items-center">
          <div className="w-6/12 h-4/6 bg-white-100 p-5 rounded-3xl flex flex-col items-center gap-5">
            <div className="w-full flex flex-row-reverse">
              <button
                onClick={handleCloseModal}
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
                className="border-b-2 border-black-900 text-2xl w-4/6 mb-3"
                type="text"
                name="name"
                value={values.name}
                placeholder="Nombre de usuario"
                onChange={handleInputOnChange}
              />
              <input
                className="border-b-2 border-black-900 text-2xl w-4/6 mb-3"
                type="password"
                name="pswd"
                value={values.pswd}
                placeholder="Contraseña"
                onChange={handleInputOnChange}
              />
              <input
                className="border-b-2 border-black-900 text-2xl w-4/6 mb-3"
                type="password"
                name="pswd2"
                value={values.pswd2}
                placeholder="Repita la contraseña"
                onChange={handleInputOnChange}
              />
              <select
                className="border-2 border-black-900 text-2xl w-4/6 mb-3"
                name="userType"
                value={values.userType}
                onChange={handleInputOnChange}
              >
                <option
                  value=""
                  disabled
                  hidden
                >
                  Tipo de usuario
                </option>
                <option value="admin">Administrador general</option>
                <option value="second_admin">Administrador Secundario</option>
                <option value="employee">Empleado</option>
              </select>
              <select
                className="border-2 border-black-900 text-2xl w-4/6 mb-3"
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
        <ModalAux
          estado={estado}
          cambiarEstado={cambiarEstado}
          isActive={isActive}
          setisActive={setisActive}
          motivo={motivo}
          initialFormValues={initialFormValues}
          setValues={setValues}
          msj={msj}
          setmsj={setMsj}
        />
      </>
    );
  }

  return null;
};

export default ModalCrud;
