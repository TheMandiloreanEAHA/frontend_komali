import React from "react";
import completedIcon from "../../../assets/completedIcon.svg";
import pendingIcon from "../../../assets/pendingIcon.svg";
import logoutIcon from "../../../assets/logoutIcon.svg";
import burgerMenu from "../../../assets/burgerMenu.svg";

const HiddenSideBar = () => {
  return (
    <div className="w-full h-full rounded-3xl flex flex-col text-white-100 text-center bg-white-100">
      <div className="bg-uv-blue h-16 mb-6 rounded-t-3xl flex items-center justify-center">
        <img className="h-8 stroke-[10px]" src={burgerMenu} alt="Menú" />
      </div>
      <div className="grid gap-8 justify-center">
        <div className="bg-uv-green w-20 h-20 rounded-full p-2 flex justify-center items-center">
          <img src={pendingIcon} alt="Pendientes" />
        </div>
        <div className="bg-uv-blue w-20 h-20 rounded-full p-4 flex justify-center items-center">
          <img src={completedIcon} alt="Completadas" />
        </div>
      </div>
    </div>
  );
};

export default HiddenSideBar;
