import React from "react";
import click from "../../assets/uv/ICON BTN TOUCH - SVG.svg";
import logoComedores from "../../assets/uv/logoComedores.svg";
import fondoMascara from "../../assets/uv/fondoMascara.svg";
import background from "../../assets/uv/background.jpg";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/axiosHelper.js";

const WelcomeScreen = () => {
  const [diningRoomData, setDiningRoomData] = useState({});

  useEffect(() => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data) {
      getDinerRoomData(data.dining_room_id);
    }
  }, []);

  const getDinerRoomData = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/dining-room/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningRoomData(result.data);
    }
  };

  const setDiningLogo = () => {
    const diningLogo = diningRoomData.dining_logo;
    if (diningLogo === undefined || diningLogo === null) {
      return logoComedores;
    } else {
      return diningLogo;
    }
  };

  const setDiningBackground = () => {
    const diningBg = diningRoomData.dining_bg;
    console.log(diningBg);
    if (diningBg === undefined || diningBg === null) {
      return background;
    } else {
      return diningBg;
    }
  };

  const goScanScreen = () => {
    window.location = "/home/store";
  };

  return (
    <>
      <div className="relative  h-[96.6vh] overflow-hidden">
        <img
          src={setDiningBackground()}
          alt="Fondo del comedor"
          className="absolute inset-0  h-[100vh]l object-fill top-[67vh] bg-cover"
        />
        <div className="h-[800vh]"></div>
        <img
          src={fondoMascara}
          alt="Fondo mascara"
          className="absolute inset-0 w-screen h-[80vh] object-cover "
        />
      </div>
      <div className="fixed inset-0 flex flex-col top-[25vh] items-center text-center z-50">
        <div>
          <h1 className="top-0 text-6xl font-bold">Bienvenido a</h1>
          <img
            src={logoComedores}
            alt="Imágen del sistema"
            className="w-65 h-65 object-fill mt-4"
          />
          <p className="mt-4 text-6xl font-bold">Ordena aquí</p>
        </div>
        <div className="mt-8">
          <div
            className="mt-6 p-4 text-4xl text-white-100 bg-uv-blue rounded-full absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={goScanScreen}
          >
            <div className="flex flex-row justify-center items-center px-1">
              <img
                src={click}
                alt="Icono click"
                className="h-9 fill-white-100 stroke-white-100"
              />
              <span className="ml-5">Toca para comenzar</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeScreen;
