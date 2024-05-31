import { useContext } from "react";
import { crudContext } from "../pages/Admin";

const ModalAux = ({
  isActive,
  setisActive,
  motivo,
  initialFormValues,
  setValues,
  msj,
  setmsj,
}) => {
  const { modal } = useContext(crudContext);
  const [isModalOpen, setIsModalOpen] = modal;

  const renderMotivo = (btn) => {
    if (!btn) {
      switch (motivo) {
        case "success":
          return <label className="text-2xl my-4">¡ACCIÓN EXITOSA!</label>;
        case "error":
          return <label className="text-2xl my-4">ERROR EN LA ACCIÓN</label>;
        case "missing":
          return <label className="text-2xl my-4">ADVERTENCIA</label>;
      }
    } else {
      switch (motivo) {
        case "success":
          return (
            <>
              <button
                onClick={cerrarAmbos}
                className="w-52 h-14 mt-5 rounded-full bg-uv-green text-2xl text-white-100 hover:font-bold"
              >
                Aceptar
              </button>
            </>
          );
        case "error":
          return (
            <>
              <label className="text-xl text-center">
                Ha ocurrdio un error, intente nuevamente
              </label>
              <button
                onClick={cerrarAmbos}
                className="w-52 h-14 rounded-full bg-error text-2xl text-white-100 hover:font-bold"
              >
                Aceptar
              </button>
            </>
          );
        case "missing":
          if (msj !== "") {
            return (
              <>
                <label className="text-xl text-center">{msj}</label>
                <button
                  onClick={cerrar}
                  className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
                >
                  Aceptar
                </button>
              </>
            );
          } else {
            return (
              <>
                <label className="text-xl text-center">
                  Llene todos los datos del formulario, por favor
                </label>
                <button
                  onClick={cerrar}
                  className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
                >
                  Aceptar
                </button>
              </>
            );
          }
      }
    }
  };

  const cerrarAmbos = () => {
    setValues(initialFormValues);
    setIsModalOpen(!isModalOpen);
    setisActive(!isActive);
    setmsj("");
  };

  const cerrar = () => {
    setisActive(!isActive);
    setmsj("");
  };

  if (isActive) {
    return (
      <div className="fixed inset-0 bg-black-900 bg-opacity-20 backdrop-blur-none flex justify-center items-center">
        <div className="w-4/12 h-1/3 bg-white-100 p-5 rounded-3xl flex flex-col items-center gap-5">
          {renderMotivo(false)}
          {renderMotivo(true)}
        </div>
      </div>
    );
  }
};

export default ModalAux;
