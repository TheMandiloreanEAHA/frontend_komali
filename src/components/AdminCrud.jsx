import AdminTable from "./AdminTable";
import NavBarCrud from "./NavBarCrud";

const AdminCrud = () => {
  return (
    <>
      <div className="rounded-lg border-4 border-gray-500/20">
        <NavBarCrud />
        <AdminTable />
      </div>
    </>
  );
};
export default AdminCrud;
