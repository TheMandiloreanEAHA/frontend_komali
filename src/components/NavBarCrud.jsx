const NavBarCrud = ({ estado, cambiarEstado, funcion }) => {
  const setState = (accion) => {
    cambiarEstado(!estado);
    funcion(accion);
  };

  return (
    <div class="grid grid-cols-6 mt-3">
      <button
        onClick={() => setState("agregar")}
        className="h-10 w-2/3 ml-8 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Nuevo
      </button>
      <button
        onClick={() => setState("modificar")}
        className=" h-10 w-2/3 ml-4 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Editar
      </button>
      <button
        onClick={() => setState("eliminar")}
        className=" h-10 w-2/3 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
        type="button"
      >
        Eliminar
      </button>
      <input
        type="text"
        id="buscar"
        placeholder="Nombre empleado"
        className="col-span-3 h-10  rounded-full border-2 border-uv-blue p-4 mr-4"
      />
    </div>
  );
};

export default NavBarCrud;
