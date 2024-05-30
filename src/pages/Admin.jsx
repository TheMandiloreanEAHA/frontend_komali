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
import InfoComedorForm from "../components/crud/InfoComedorForm";
import { API_URL } from "../config/config";
import ModalWarning from "../components/ModalWarning";

export const crudContext = React.createContext();

function Admin() {
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const [diningName, setDiningName] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedAction, setSelectedAction] = useState();
  const [selectedRow, setSelectedRow] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalWarnOpen, setIsModalWarnOpen] = useState(false);

  const userTypes = ["admin", "second_admin"];

  const setInitCategory = () => {
    if (data.user_type === "admin") {
      setSelectedCategory("admin");
    }
    if (data.user_type === "second_admin") {
      setSelectedCategory("comedor");
    }
  };

  useEffect(() => {
    const initDiningRoom = async () => {
      setInitCategory();
      await getDiningRoom();
    };

    if (!userTypes.includes(data.user_type)) {
      window.location = "/";
    } else {
      initDiningRoom();
    }
  }, []);

  const getDiningRoom = async () => {
    const url = `${API_URL}dining-room/${data.dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningName(result.data.dining_name);
    }
  };

  return (
    <crudContext.Provider
      value={{
        category: [selectedCategory, setSelectedCategory],
        action: [selectedAction, setSelectedAction],
        row: [selectedRow, setSelectedRow],
        modal: [isModalOpen, setIsModalOpen],
        modalWarn: [isModalWarnOpen, setIsModalWarnOpen],
      }}
    >
      <div className="w-full h-screen bg-gray-100">
        <TopBar userType="Admin" />
        <InfoCardUser
          userName={data.user_name}
          diningRoomName={diningName}
          userType={data.user_type}
        />
        <div className="flex gap-8 p-8 w-full h-4/5">
          <div className=" flex-none w-1/5">
            <AdminOptions
              userType={data.user_type}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
          <div className="w-4/5 h-full">
            {selectedCategory === "comedor" ? (
              <InfoComedorForm />
            ) : (
              <AdminCrud
                setIsModalOpen={setIsModalOpen}
                selectedCategory={selectedCategory}
              />
            )}
          </div>
        </div>
        {isModalOpen && (
          <ModalCrud
            setIsModalOpen={setIsModalOpen}
            selectedAction={selectedAction}
            category={selectedCategory}
          />
        )}
        {isModalWarnOpen && (
          <ModalWarning
            isModalWarnOpen={isModalWarnOpen}
            setIsModalWarnOpen={setIsModalWarnOpen}
          />
        )}
      </div>
    </crudContext.Provider>
  );
}

export default Admin;
