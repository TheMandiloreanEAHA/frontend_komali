import React from "react";
import { useEffect } from "react";
import successIcon from "../../../assets/successIcon.svg";

const SuccessMsg = ({ onCreateOrder }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCreateOrder();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-col justify-center items-center">
        <img className="h-80" src={successIcon} alt="Icono de exito" />
        <p className="text-5xl font-bold">Su orden a sido tomada con éxito</p>
      </div>
    </div>
  );
};

export default SuccessMsg;
