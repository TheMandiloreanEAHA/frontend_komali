import NavBarCrud from "./NavBarCrud";
import TableAdmin from "./TableAdmin";
import { useEffect, useState, useContext } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config/config";
import { crudContext } from "../pages/Admin";
import {
  getUsers,
  getDiningRooms,
  getProducts,
  getEmployees,
} from "../utils/requestHelper";

const AdminCrud = ({ selectedCategory }) => {
  const [headersTableNames, setHeadersTableNames] = useState();
  const { list } = useContext(crudContext);
  const [dataList, setDataList] = list;

  useEffect(() => {
    selectedCategoryTable();
  }, [selectedCategory]);

  const selectedCategoryTable = async () => {
    setHeadersTableNames(undefined);
    switch (selectedCategory) {
      case "admin":
        setDataList(await getUsers());
        setHeadersTableNames({
          user_name: "Nombre",
          user_type: "Tipo",
          dining_name: "Comedor",
        });
        break;
      case "comedores":
        setDataList(await getDiningRooms());
        setHeadersTableNames({
          dining_name: "Nombre",
          is_active: "Estado",
        });
        break;
      case "productos":
        setDataList(await getProducts());
        setHeadersTableNames({
          product_name: "Nombre",
          product_price: "Precio",
          prodcut_calories: "Calorias",
          is_active: "Estado",
        });
        break;
      case "empleados":
        setDataList(await getEmployees());
        setHeadersTableNames({
          user_name: "Nombre",
          user_type: "Tipo",
        });
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
