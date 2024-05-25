import React from "react";

const SideBar = ({ setList }) => {
  const onLogout = () => {
    window.location = "/";
  };

  return (
    <div className="relative w-full h-full rounded-3xl text-white-100 font-bold text-2xl text-center bg-white-100">
      <div className="bg-uv-blue h-16 mb-6 rounded-t-3xl flex justify-center items-center">
        Ordenes
      </div>
      <div className="grid gap-y-8 px-6">
        <button
          onClick={() => {
            setList(true);
          }}
          className="bg-uv-green w-full h-20 rounded-full flex justify-center items-center"
        >
          Pendientes
        </button>
        <button
          onClick={() => {
            setList(false);
          }}
          className="bg-uv-blue w-full h-20 rounded-full flex justify-center items-center"
        >
          Completadas
        </button>
      </div>
      <button className="absolute bottom-0 w-full flex justify-center items-center pb-6">
        <div
          onClick={onLogout}
          className=" bg-red-700 h-20 rounded-full p-4 flex justify-center items-center"
        >
          Cerrar sesión
        </div>
      </button>
    </div>
  );
};

export default SideBar;
