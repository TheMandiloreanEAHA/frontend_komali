import NavBarCrud from "./NavBarCrud";
import TableAdmin from "./TableAdmin";
import { useEffect, useState, useContext } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";

const AdminCrud = ({ selectedCategory }) => {
  const [dataList, setDataList] = useState();
  const [headersTableNames, setHeadersTableNames] = useState();

  useEffect(() => {
    selectedCategoryTable();
  }, [selectedCategory]);

  const getUsers = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDataList(result.data);
    }
  };

  const getDiningRooms = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/dining-room/`;
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
      default:
        console.log("tilin");
        break;
    }
  };

  return (
    <>
      <div className="rounded-3xl w-full h-full p-6 bg-white-100">
        <NavBarCrud />
        <TableAdmin
          dataList={dataList}
          headNames={headersTableNames}
        />
      </div>
    </>
  );
};
export default AdminCrud;
