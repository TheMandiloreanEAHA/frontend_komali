import NavBarCrud from "./NavBarCrud";
import TableAdmin from "./TableAdmin";
import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { axiosGet } from "../utils/axiosHelper";

const AdminCrud = ({
  isModalOpen,
  setIsModalOpen,
  selectedCategory,
  setSelectedAction,
  setSelectedRow,
  selectedRow,
}) => {
  const [dataList, setDataList] = useState();
  const [headersTableNames, setHeadersTableNames] = useState();

  console.log(selectedCategory);

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
    console.log(selectedCategory);
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
          is_active: "Activo",
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
        <NavBarCrud
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedAction={setSelectedAction}
        />
        <TableAdmin
          dataList={dataList}
          headNames={headersTableNames}
          setSelectedRow={setSelectedRow}
          selectedRow={selectedRow}
        />
      </div>
    </>
  );
};
export default AdminCrud;
