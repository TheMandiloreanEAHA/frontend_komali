import { useEffect } from "react";

const TemporalModal = ({
  closeTemporalModal,
  message = "Ejemplo de mensaje",
  icon,
}) => {
  useEffect(() => {
    closeModal();
  }, []);

  const closeModal = () => {
    const timer = setTimeout(() => {
      closeTemporalModal();
    }, 3000);
    return () => clearTimeout(timer);
  };

  return (
    <div className="flex fixed top-6 right-6 shadow-xl p-8 w-1/4 h-48 rounded-3xl bg-gray-100 justify-center items-center text-xl">
      <img src={icon} alt="Icono" />
      <p className="pl-4">{message}</p>
    </div>
  );
};

export default TemporalModal;
