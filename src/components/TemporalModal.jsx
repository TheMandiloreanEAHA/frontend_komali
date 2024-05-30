import { useEffect } from "react";
import successIcon from "../assets/successIcon.svg";

const TemporalModal = ({
  setTemporalModal,
  message = "Ejemplo de mensaje",
  type = "success",
}) => {
  useEffect(() => {
    closeModal();
  }, []);

  const closeModal = () => {
    const timer = setTimeout(() => {
      setTemporalModal(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const setIcon = () => {
    switch (type) {
      case "success":
        return successIcon;
      default:
        return successIcon;
    }
  };

  return (
    <div className="flex fixed top-6 right-6 shadow-xl px-8 py-4 w-1/4 h-40 rounded-3xl bg-gray-100 justify-center items-center text-xl">
      <img className="h-20 w-20" src={setIcon()} alt="Icono" />
      <p className="pl-4">{message}</p>
    </div>
  );
};

export default TemporalModal;
