import { useContext } from "react";
import { crudContext } from "../../pages/Admin";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { axiosDelete } from "../../utils/axiosHelper";
import { API_URL } from "../../config/config";
import {
  getUsers,
  getDiningRooms,
  getProducts,
  getEmployees,
} from "../../utils/requestHelper";

const DeleteForm = () => {
  const { row, category, modal, list } = useContext(crudContext);
  const [selectedRow, setSelectedRow] = row;
  const [selectedCategory, setSelectedCategory] = category;
  const [isModalOpen, setIsModalOpen] = modal;
  const [dataList, setDataList] = list;

  const deleteAdmin = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}${selectedRow}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  const deleteDining = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}dining-room/${selectedRow}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  const deleteProduct = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}products/${selectedRow}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  const deleteEmployee = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}${selectedRow}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  const onDeleteRow = async () => {
    switch (selectedCategory) {
      case "admin":
        await deleteAdmin();
        setDataList(await getUsers());
        break;
      case "comedores":
        await deleteDining();
        setDataList(await getDiningRooms());
        break;
      case "productos":
        await deleteProduct();
        setDataList(await getProducts());
        break;
      case "empleados":
        await deleteEmployee();
        setDataList(await getEmployees());
        break;
      default:
        console.log("Categoría inválida");
        break;
    }
    setIsModalOpen(!isModalOpen);
    // CORREGIR
  };

  return (
    <div className="w-full h-full text-xl flex flex-col justify-center items-center p-8 mt-4">
      <h1 className="font-bold">¿Seguro que desea eliminar este registro?</h1>
      <button
        className="font-bold px-6 py-2 bg-uv-green text-white-100 rounded-full mt-4"
        onClick={onDeleteRow}
      >
        Confirmar
      </button>
    </div>
  );
};

export default DeleteForm;
