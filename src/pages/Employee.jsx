import React from "react";
import { useEffect } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import TopBar from "../components/TopBar";
import logoComedores from "../assets/uv/logoComedores.svg";
import ordersIcon from "../assets/ordersIcon.svg";
import shoppingCarIcon from "../assets/shoppingCarIcon.svg";

const Employee = () => {
  const changeScreen = (pantalla) => {
    switch (pantalla) {
      case "order":
        window.location = "/order";
        break;
      case "home":
        window.location = "/home";
        break;
      default:
        console.log("Pantalla inválida");
    }
  };

  useEffect(() => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data.user_type !== "employee") {
      window.location = "/";
    }
  }, []);

  return (
    <>
      <TopBar />
      <div className="relative flex items-center justify-center text-center mt-44">
        <div className="absolute -top-16 w-[8rem] h-[8rem] bg-black rounded-full shadow-[#999] shadow-md">
          <img src={logoComedores} alt="Logo de comedores universitarios uv" />
        </div>
        <div className="rounded-lg flex flex-col items-center justify-center text-center shadow-[#999] shadow-inner px-8 py-6 w-1/2">
          <div className="mt-16 text-xl font-bold">
            ¿A dónde desea ingresar?
          </div>
          <div className="mt-4 w-full flex justify-around items-center text-lg">
            <div>
              <div
                className="flex flex-col justify-center items-center bg-uv-blue w-28 h-28 rounded-full cursor-pointer"
                onClick={() => {
                  changeScreen("order");
                }}
              >
                <img src={ordersIcon} alt="Ordenes" />
              </div>
              Ordenes
            </div>
            <div>
              <div
                className="flex flex-col justify-center items-center bg-uv-green w-28 h-28 rounded-full cursor-pointer"
                onClick={() => {
                  changeScreen("home");
                }}
              >
                <img src={shoppingCarIcon} alt="Ordenes" />
              </div>
              Tienda
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
