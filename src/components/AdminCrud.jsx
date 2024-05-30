import NavBarCrud from "./NavBarCrud";
import TableAdmin from "./TableAdmin";
import { useEffect, useState, useContext } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config/config";

const AdminCrud = ({ selectedCategory }) => {
  const [dataList, setDataList] = useState();
  const [headersTableNames, setHeadersTableNames] = useState();

  useEffect(() => {
    selectedCategoryTable();
  }, [selectedCategory]);

  const getUsers = async () => {
    const token = getDataLocalStorage("token");
    const url = API_URL;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDataList(result.data);
    }
  };

  const getDiningRooms = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}dining-room/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDataList(result.data);
    }
  };

  const getProducts = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const url = `${API_URL}products/${data.dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDataList(result.data);
    }
  };

  const getEmployees = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const url = `${API_URL}employees/${data.dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDataList(result.data);
    }
  };

  const selectedCategoryTable = () => {
    switch (selectedCategory) {
      case "admin":
        getUsers();
        setHeadersTableNames({
          user_name: "Nombre",
          user_type: "Tipo",
          dining_name: "Comedor",
        });
        break;
      case "comedores":
        getDiningRooms();
        setHeadersTableNames({
          dining_name: "Nombre",
          is_active: "Estado",
        });
        break;
      case "productos":
        getProducts();
        setHeadersTableNames({
          product_name: "Nombre",
          product_price: "Precio",
          prodcut_calories: "Calorias",
          is_active: "Estado",
        });
        break;
      case "empleados":
        getEmployees();
        setHeadersTableNames({
          user_name: "Nombre",
          user_type: "Tipo",
        });
        break;
      case "comedor":
        break;
      default:
        console.log("Opción inválida");
        break;
    }
  };

  return (
    <>
      <div className="rounded-3xl w-full h-full p-6 bg-white-100">
        <div className="h-1/6 mp-20">
          <NavBarCrud />
        </div>
        <div className="w-full h-5/6 overflow-y-auto rounded-2xl shadow-lg">
          <TableAdmin dataList={dataList} headNames={headersTableNames} />
        </div>
      </div>
    </>
  );
};
export default AdminCrud;
