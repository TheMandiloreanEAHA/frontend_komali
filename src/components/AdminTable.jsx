import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";

const AdminTable = ({ infoTable }) => {
  const [userList, setUserList] = useState();
  const [diningRoomList, setDiningRoomList] = useState("");
  const [selectedRow, setselectedRow] = useState();

  useEffect(() => {
    const initUserList = async () => {
      await getUsers();
    };

    const initDiningRoomList = async () => {
      await getDiningRooms();
    };

    if (infoTable === "admin") {
      initUserList();
    } else {
      initDiningRoomList();
    }
  });

  const getUsers = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setUserList(result.data);
    }
  };

  const getDiningRooms = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/dining-room/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningRoomList(result.data);
    }
  };

  const renderEstado = (isActive) => {
    if (isActive) {
      return <td class="bg-gray-300 pl-2">Activo</td>;
    } else {
      return <td class="bg-gray-300 pl-2">Inactivo</td>;
    }
  };

  //Mostrar tabla usuarios...
  if (infoTable === "admin") {
    return (
      <div class="m-5  rounded-lg border-4 border-gray-500/20">
        <table className="w-full">
          <tr>
            <th class="bg-gray-600">Nombre de usuario</th>
            <th class="bg-gray-400">Tipo de usuario</th>
            <th class="bg-gray-600">Comedor asignado</th>
          </tr>
          {userList ? (
            userList.map((item, index) => {
              return (
                <tr key={index}>
                  <td class="bg-gray-500 pl-2">{item.user_name}</td>
                  <td class="bg-gray-300 pl-2">{item.user_type}</td>
                  <td class="bg-gray-500 pl-2">{item.dining_name}</td>
                </tr>
              );
            })
          ) : (
            <span>Cargando Datos....</span>
          )}
        </table>
      </div>
    );
  } else {
    //... O mostrar los comedores
    return (
      <div class="m-5  rounded-lg border-4 border-gray-500/20">
        <table className="w-full">
          <tr>
            <th class="bg-gray-600">Logo</th>
            <th class="bg-gray-400">Nombre del Comedor</th>
            <th class="bg-gray-600">Estado del Comedor</th>
          </tr>
          {diningRoomList ? (
            diningRoomList.map((item, index) => {
              return (
                <tr key={index}>
                  <td class="bg-gray-500 pl-2">Logo Perrón</td>
                  <td class="bg-gray-300 pl-2">{item.dining_name}</td>
                  {renderEstado(item.is_active)}
                </tr>
              );
            })
          ) : (
            <span>Cargando Datos....</span>
          )}
        </table>
      </div>
    );
  }
};

export default AdminTable;
/*
return (
  <div class="m-5  rounded-lg border-4 border-gray-500/20">
    <table className="w-full">
      <tr>
        <th class="bg-gray-600">Nombre de usuario</th>
        <th class="bg-gray-400">Tipo de usuario</th>
        <th class="bg-gray-600">Comedor asignado</th>
      </tr>
      <tr>
        <td class="bg-gray-500 pl-2">changuito</td>
        <td class="bg-gray-300 pl-2">admin</td>
        <td class="bg-gray-500 pl-2">Komalli</td>
      </tr>
      <tr>
        <td class="bg-gray-500 pl-2">alexito</td>
        <td class="bg-gray-300 pl-2">second_admin</td>
        <td class="bg-gray-500 pl-2">Komalli</td>
      </tr>
      <tr>
        <td class="bg-gray-500 pl-2">ericksito</td>
        <td class="bg-gray-300 pl-2">employee</td>
        <td class="bg-gray-500 pl-2">Komalli</td>
      </tr>
    </table>
  </div>
);
*/
