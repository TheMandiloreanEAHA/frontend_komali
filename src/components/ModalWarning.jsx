const ModalWarning = ({ isModalWarnOpen, setIsModalWarnOpen }) => {
  const closeModal = () => {
    setIsModalWarnOpen(!isModalWarnOpen);
  };

  return (
    <div className="fixed inset-0 bg-black-900 bg-opacity-20 backdrop-blur-none flex justify-center items-center">
      <div className="w-4/12 h-1/3 bg-white-100 p-5 rounded-3xl flex flex-col items-center gap-5">
        <label className="text-2xl mt-4 font-bold">ATENCIÓN</label>
        <label className="text-xl text-center">
          Para editar o eliminar, debe seleccionar un registro de la tabla.
        </label>
        <button
          onClick={() => {
            closeModal();
          }}
          className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalWarning;
