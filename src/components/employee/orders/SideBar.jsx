import React from "react";

const SideBar = () => {
  return (
    <div className="w-full h-full rounded-3xl flex flex-col text-white-100 font-bold text-2xl text-center bg-white-100">
      <div className="bg-uv-blue h-16 mb-6 rounded-t-3xl flex justify-center items-center">
        Ordenes
      </div>
      <div className="grid gap-y-8 px-8">
        <button className="bg-uv-green w-full h-20 rounded-full flex justify-center items-center">
          Pendientes
        </button>
        <button className="bg-uv-blue w-full h-20 rounded-full flex justify-center items-center">
          Completadas
        </button>
      </div>
    </div>
  );
};

export default SideBar;
