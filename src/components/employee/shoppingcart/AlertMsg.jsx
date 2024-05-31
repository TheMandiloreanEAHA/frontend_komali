import React from "react";
import alertIcon from "../../../assets/alertIcon.svg";

const AlertMsg = ({ total, setStep }) => {
  return (
    <div className="h-full relative">
      <div className="flex flex-col justify-center items-center px-8 pb-8">
        <img className="w-80" src={alertIcon} alt="warning icon" />
        <h3 className="text-3xl text-uv-blue font-bold uppercase py-4">
          Actualmente solo contamos con pago en caja
        </h3>
        <p className="text-2xl text-uv-blue uppercase pb-4">
          Espera las próximas novedades
        </p>
        <p className="text-3xl font-bold pb-4">
          Total:<span className="text-uv-blue">{" $" + total.toFixed(2)}</span>
        </p>
      </div>
      <div
        className="bg-uv-green w-full py-6 rounded-b-3xl cursor-pointer absolute bottom-0 left-0"
        onClick={() => setStep(1)}
      >
        <button className="text-3xl font-bold text-white-100">Continuar</button>
      </div>
    </div>
  );
};

export default AlertMsg;
