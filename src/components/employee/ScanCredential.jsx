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
  const [errorMsg, setErrorMsg] = useState("");

  const onGoStore = () => {
    if (validateMatricula()) {
      let auxMatricula = "";
      if (clientType === 0) {
        auxMatricula = `S${matricula}`;
      }
      onChangeMatricula(auxMatricula);
      onChangeScaning(false);
      onChangeClientType(types[clientType]);
    } else {
      setErrorMsg("Matrícula inválida, debe tener 8 caracteres numéricos");
    }
  };

  const onGoStoreGeneral = () => {
    setClientType(2);
    onChangeScaning(false);
    onChangeClientType(clientType[clientType]);
  };

  const validateMatricula = () => {
    const regexMatricula = /^\d{8}$/;
    if (regexMatricula.test(matricula)) {
      return true;
    }
    return false;
  };

  const validateInputMatricula = (e) => {
    const regexMatricula = /^\d{1,8}$/;
    if (e.target.value === "" || regexMatricula.test(e.target.value)) {
      setMatricula(e.target.value);
    }
  };

  const showClientWelcome = () => {
    if (clientType === 0) {
      return (
        <>
          <h1 className="text-uv-blue text-4xl font-bold">
            Bienvenido Estudiante
          </h1>
          <h3 className="text-2xl font-bold m-8">
            Escaneé su matrícula desde su credencial o ingrese manualmente (solo
            números)
          </h3>
        </>
      );
    }
    if (clientType === 1) {
      return (
        <>
          <h1 className="text-uv-blue text-4xl font-bold">
            Bienvenido Docente
          </h1>
          <h3 className="text-2xl font-bold m-8">
            Escaneé su número de personal desde su credencial o ingrese
            manualmente (solo números)
          </h3>
        </>
      );
    }
  };

  const showClientBtnType = () => {
    if (clientType === 0) {
      return (
        <div
          onClick={() => {
            setClientType(1);
          }}
        >
          <img
            className="h-32 cursor-pointer"
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
            className="h-32 cursor-pointer"
            src={estudianteBtn}
            alt="Imagen estudiante"
          />
          <span>Soy estudiante UV</span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-2 mx-16">
        {showClientWelcome()}
        <p className="text-2xl">El código de barras va hacia arriba</p>
        <img className="h-56 my-4" src={credential} alt="Imagen de escaneo" />
        <div className="text-center text-error mb-4">{errorMsg}</div>
        <input
          className="bg-gray-100 rounded-full border-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent py-4 text-xl text-center w-1/2 remove-arrow"
          type="text"
          value={matricula}
          onChange={validateInputMatricula}
          placeholder="Matrícula"
        />
        <button
          className="text-xl bg-uv-blue text-white-100 font-bold p-3 w-1/5 rounded-full m-4"
          onClick={onGoStore}
        >
          Continuar
        </button>
        <div className="flex justify-between items-center w-1/4 text-center">
          {showClientBtnType()}
          <div className="cursor-pointer" onClick={onGoStoreGeneral}>
            <img className="h-32" src={generalBtn} alt="Imagen invitado" />
            <span>Soy visitante</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanCredential;
