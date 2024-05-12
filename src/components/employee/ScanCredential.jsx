import { useState } from "react";
import credential from "../../assets/credential.svg";
import docenteBtn from "../../assets/docenteBtn.svg";
import estudianteBtn from "../../assets/estudianteBtn.svg";
import generalBtn from "../../assets/generalBtn.svg";

const ScanCredential = ({
  onChangeMatricula,
  onChangeScaning,
  onChangeClientType,
}) => {
  const types = ["estudiante", "maestro", "general"];
  const [clientType, setClientType] = useState(0);
  const [matricula, setMatricula] = useState("");

  const onGoStore = () => {
    onChangeMatricula(matricula);
    onChangeScaning(false);
    onChangeClientType(types[clientType]);
  };

  const onGoStoreGeneral = () => {
    onChangeScaning(false);
    onChangeClientType(clientType);
  };

  const showClientType = () => {
    if (clientType === 0) {
      return (
        <div
          onClick={() => {
            setClientType(1);
          }}
        >
          <img
            className="h-40 cursor-pointer"
            src={docenteBtn}
            alt="Imagen docente"
          />
          <span>Soy docente UV</span>
        </div>
      );
    }
    if (clientType === 1) {
      return (
        <div
          onClick={() => {
            setClientType(0);
          }}
        >
          <img
            className="h-40 cursor-pointer"
            src={estudianteBtn}
            alt="Imagen docente"
          />
          <span>Soy estudiante UV</span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col pt-8 mx-16">
        <h1 className="text-uv-blue text-5xl font-bold">
          Bienvenido Estudiante
        </h1>
        <h3 className="text-4xl font-bold m-12">
          Escanea tu matrícula desde tu credencial
        </h3>
        <p className="text-2xl">El código de barras va hacia arriba</p>
        <img className="h-96 py-8" src={credential} alt="Imagen de escaneo" />
        <input
          className="bg-gray-100 rounded-full border-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent py-4 text-2xl text-center w-3/4 remove-arrow"
          type="number"
          name="matricula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          placeholder="Matrícula"
        />
        <button
          className="text-3xl bg-uv-blue text-white-100 p-4 w-1/4 rounded-full m-4"
          onClick={onGoStore}
        >
          Continuar
        </button>
        <div className="flex justify-center items-center">
          {showClientType()}
          <div className="cursor-pointer" onClick={onGoStoreGeneral}>
            <img className="h-40" src={generalBtn} alt="Imagen invitado" />
            <span>Soy visitante</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanCredential;
