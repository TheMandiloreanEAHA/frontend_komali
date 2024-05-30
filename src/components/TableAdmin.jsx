import { crudContext } from "../pages/Admin";
import { useContext } from "react";

const TableAdmin = ({ dataList = [], headNames }) => {
  const { row } = useContext(crudContext);
  const [selectedRow, setSelectedRow] = row;

  console.log(dataList);
  const onGetRowInfo = (e) => {
    const element = document.querySelector(`[dataValue="${selectedRow}"]`);
    if (element && element.classList.contains("bg-uv-blue", "text-white-100")) {
      element.classList.remove("bg-uv-blue", "text-white-100");
      element.classList.add("hover:bg-gray-200", "hover:text-white-100");
    }
    e.target.parentElement.classList.remove(
      "bg-white-100",
      "hover:bg-gray-200",
      "hover:text-white-100"
    );
    e.target.parentElement.classList.add("text-white-100", "bg-uv-blue");
    setSelectedRow(e.target.parentElement.getAttribute("dataValue"));
  };

  return (
    <>
      {dataList.length > 0 && (
        <>
          <div class="overflow-x-auto w-full h-auto rounded-2xl">
            <table class="w-full text-left">
              <thead class="uppercase bg-gray-400">
                <tr>
                  {Object.entries(dataList[0]).map((entry, index) => {
                    const key = entry[0];
                    if (headNames[key]) {
                      return (
                        <td key={index} className="px-6 py-3">
                          {headNames[key]}
                        </td>
                      );
                    }
                  })}
                </tr>
              </thead>
              <tbody>
                {dataList.map((item, index) => {
                  return (
                    <tr
                      key={Object.values(item)[0]}
                      dataValue={Object.values(item)[0]}
                      class="bg-white-100 hover:bg-gray-200 hover:text-white-100 cursor-pointer"
                      onClick={onGetRowInfo}
                    >
                      {Object.entries(item).map((entry, index) => {
                        const key = entry[0];
                        if (headNames[key]) {
                          const value = entry[1];
                          if (value === true) {
                            return <td class="px-6 py-4">Activo</td>;
                          } else if (value === false) {
                            return <td class="px-6 py-4">Inactivo</td>;
                          } else {
                            return <td class="px-6 py-4">{value}</td>;
                          }
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <table>
            <thead>
              <tr></tr>
            </thead>
            <tbody></tbody>
          </table>
        </>
      )}
    </>
  );
};

export default TableAdmin;
