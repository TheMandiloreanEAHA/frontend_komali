import UserForm from "./crud/UserForm";
import EditUserForm from "./crud/EditUserForm";
import ComedorForm from "./crud/ComedorForm";
import DeleteForm from "../components/crud/DeleteForm";

import React from "react";
import ProductForm from "./crud/ProductForm";
import EditComedorForm from "./crud/EditComedorForm";

const ModalCrud = ({ setIsModalOpen, selectedAction, category }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderSelectedForm = () => {
    if (category === "admin") {
      switch (selectedAction) {
        case "agregar":
          return <UserForm />;
        case "modificar":
          return <EditUserForm />;
        case "eliminar":
          return <DeleteForm />;
        default:
          console.log("Opción Inválida");
      }
    } else if (category === "comedores") {
      switch (selectedAction) {
        case "agregar":
          return <ComedorForm />;
        case "modificar":
          return <EditComedorForm />;
        case "eliminar":
          return <DeleteForm />;
        default:
          console.log("Opción Inválida");
      }
    } else if (category === "productos") {
      switch (selectedAction) {
        case "agregar":
          return <ProductForm />;
        case "modificar":
          return <ProductForm isEdit={true} />;
        case "eliminar":
          return <DeleteForm />;
        default:
          console.log("Opción Inválida");
      }
    } else {
      switch (selectedAction) {
        case "agregar":
          return <UserForm isSecondAdmin={true} />;
        case "modificar":
          return <EditUserForm />;
        case "eliminar":
          return <DeleteForm />;
        default:
          console.log("Opción Inválida");
      }
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-50 fixed bottom-0 right-0 flex justify-center items-center text-center">
      <div className="bg-white-100 rounded-3xl h-auto w-auto">
        <div className="relative w-full">
          <div className="flex justify-end text-xl pr-6 font-bold absolute top-0 right-0 mt-3">
            <button
              className="text-uv-blue"
              onClick={() => {
                closeModal();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div>{renderSelectedForm()}</div>
      </div>
    </div>
  );
};

export default ModalCrud;
