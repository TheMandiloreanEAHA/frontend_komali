import AdminTable from "./AdminTable";
import NavBarCrud from "./NavBarCrud";

const AdminCrud = ({ estado, cambiarEstado, fun, infoTable }) => {
  const funcion = (accion) => {
    //console.log(accion);
    fun(accion);
  };
  return (
    <>
      <div className="rounded-lg border-4 border-gray-500/20">
        <NavBarCrud
          estado={estado}
          cambiarEstado={cambiarEstado}
          funcion={funcion}
        />
        <AdminTable infoTable={infoTable} />
      </div>
    </>
  );
};
export default AdminCrud;
