import React from "react";
import click from "../../assets/uv/ICON BTN TOUCH - SVG.svg";
import logoComedores from "../../assets/uv/logoComedores.svg";
import fondo from "../../assets/uv/fondo.svg";
import background from "../../assets/uv/background.jpg";
import {
  getDataLocalStorage,
  deleteDataLocalStorage,
} from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { axiosGet } from "../../utils/axiosHelper.js";
import { API_URL } from "../../config/config.js";

const WelcomeScreen = () => {
  const [diningRoomData, setDiningRoomData] = useState({});

  useEffect(() => {
    deleteDataLocalStorage("order");
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data) {
      getDinerRoomData(data.dining_room_id);
    }
  }, []);

  const getDinerRoomData = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}dining-room/${dining_room_id}`;
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
      return `data:image/png;base64,${diningLogo}`;
    }
  };

  const setDiningBackground = () => {
    const diningBg = diningRoomData.dining_bg;
    if (diningBg === undefined || diningBg === null) {
      return background;
    } else {
      return `data:image/png;base64,${diningBg}`;
    }
  };

  const goScanScreen = () => {
    window.location = "/home/scan";
  };

  return (
    <div className="flex h-screen">
      <div className="w-3/5 bg-uv-background flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">Bienvenido a</h1>
        <img
          src={setDiningLogo()}
          alt="Imágen del sistema"
          className="w-60 h-60 my-4"
        />
        <p className="text-5xl font-bold">Ordena aquí</p>
        <div
          className="mt-6 p-4 text-3xl text-white-100 bg-uv-blue rounded-full cursor-pointer"
          onClick={goScanScreen}
        >
          <div className="flex flex-row justify-center items-center ">
            <img
              src={click}
              alt="Icono click"
              className="h-9 fill-white-100 stroke-white-100"
            />
            <span className="ml-4 fond-bold">Toca para comenzar</span>
          </div>
        </div>
      </div>
      <div className="w-2/5 h-full">
        <img
          className="object-cover h-full"
          src={setDiningBackground()}
          alt="Fondo del comedor"
        />
        {/* <img src={fondo} alt="Fondo mascara" /> */}
      </div>
    </div>
  );
};

export default WelcomeScreen;
