import React from "react";
import TopBar from "../components/TopBar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import InfoCardUser from "../components/InfoCardUser";
import AdminOptions from "../components/AdminOptions";
import AdminCrud from "../components/AdminCrud";
import ModalCrud from "../components/ModalCrud";
import { axiosGet } from "../utils/axiosHelper";

function Admin() {
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const [diningName, setDiningName] = useState();

  useEffect(() => {
    const initDiningRoom = async () => {
      await getDiningRoom();
    };

    if (data.user_type !== "admin") {
      window.location = "/";
    } else {
      initDiningRoom();
    }
  }, []);

  const getDiningRoom = async () => {
    const url = `http://127.0.0.1:8000/dining-room/${data.dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningName(result.data.dining_name);
    }
  };

  const [isOpen, setState] = useState(false);
  const [accion, setaccion] = useState("");
  const [infoTable, setinfoTable] = useState("admin");

  const funcion = (accion) => {
    setaccion(accion);
  };

  const btnSeleccionado = (btnId) => {
    setinfoTable(btnId);
  };

  return (
    <>
      <TopBar userType="Admin" />
      <InfoCardUser
        userName={data.user_name}
        diningRoomName={diningName}
        userType={data.user_type}
      />
      <div className="flex gap-4 mx-10 mt-2">
        <div className=" flex-none w-1/5">
          <AdminOptions
            userType={data.user_type}
            btnSeleccionado={btnSeleccionado}
          />
        </div>
        <div className="grow">
          <AdminCrud
            estado={isOpen}
            cambiarEstado={setState}
            fun={funcion}
            infoTable={infoTable}
          />
        </div>
      </div>
      <ModalCrud
        estado={isOpen}
        cambiarEstado={setState}
        funcion={accion}
      />
    </>
  );
}

export default Admin;
