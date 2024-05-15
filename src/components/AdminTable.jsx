const AdminTable = () => {
  return (
    <div class="m-5  rounded-lg border-4 border-gray-500/20">
      <table className="w-full">
        <tr>
          <th class="bg-gray-600">Nombre de usuario</th>
          <th class="bg-gray-400">Tipo de usuario</th>
          <th class="bg-gray-600">Comedor asignado</th>
        </tr>
        <tr>
          <td class="bg-gray-500 pl-2">changuito</td>
          <td class="bg-gray-300 pl-2">admin</td>
          <td class="bg-gray-500 pl-2">Komalli</td>
        </tr>
        <tr>
          <td class="bg-gray-500 pl-2">alexito</td>
          <td class="bg-gray-300 pl-2">second_admin</td>
          <td class="bg-gray-500 pl-2">Komalli</td>
        </tr>
        <tr>
          <td class="bg-gray-500 pl-2">ericksito</td>
          <td class="bg-gray-300 pl-2">employee</td>
          <td class="bg-gray-500 pl-2">Komalli</td>
        </tr>
      </table>
    </div>
  );
};

export default AdminTable;
