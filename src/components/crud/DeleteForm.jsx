import { useContext } from "react";
import { crudContext } from "../../pages/Admin";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { axiosDelete } from "../../utils/axiosHelper";
import { API_URL } from "../../config/config";

const DeleteForm = () => {
  const { row, category, modal } = useContext(crudContext);
  const [selectedRow, setSelectedRow] = row;
  const [selectedCategory, setSelectedCategory] = category;
  const [isModalOpen, setIsModalOpen] = modal;

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
    const url = `${API_URL}${selectedRow}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  const deleteProduct = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}${selectedRow}`;
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

  const onDeleteRow = () => {
    switch (selectedCategory) {
      case "admin":
        deleteAdmin();
        break;
      case "comedores":
        deleteDining();
        break;
      case "productos":
        deleteProduct();
        break;
      case "empleados":
        deleteEmployee();
        break;
      default:
        console.log("Categoría inválida");
        break;
    }
    setIsModalOpen(!isModalOpen);
    // CORREGIR
    window.location.reload();
  };

  return (
    <div className="w-full h-full my-6 text-xl">
      <h1 className="font-bold">¿Seguro que desea eliminar este registro?</h1>
      <button
        className="px-6 py-2 bg-uv-green text-white-100 rounded-full mt-4"
        onClick={onDeleteRow}
      >
        Confirmar
      </button>
    </div>
  );
};

export default DeleteForm;
