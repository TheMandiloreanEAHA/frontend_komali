import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosPost } from "../../../utils/axiosHelper";
import { API_URL } from "../../../config/config";

const LogOrderCard = ({ orderLogData }) => {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    const initProductsList = async () => {
      getProductsById();
    };
    initProductsList();
  }, []);

  const getProductsById = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    const productsRequest = {
      dining_id: dining_room_id,
      products_list: orderLogData.products_id,
    };
    const url = `${API_URL}products/filter`;
    const result = await axiosPost(url, productsRequest, token);
    if (result !== undefined) {
      setProductsData(result.data);
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl flex flex-col justify-between">
      <div className="bg-uv-blue w-full rounded-t-3xl text-white-100 text-2xl text-center font-bold py-2 flex justify-around">
        <div>ORDEN:{" " + orderLogData.order_num}</div>
        <div>Total:{" $" + orderLogData.total.toFixed(2)}</div>
      </div>
      <div className="p-6 capitalize text-2xl">
        <div>
          <span className="font-bold">Fecha:</span>
          {" " + orderLogData.order_date}
        </div>
        {productsData && (
          <div>
            <div className="font-bold">Productos:</div>
            <ul className="list-disc px-4 flex justify-between">
              {productsData.map((item, index) => {
                return (
                  <li key={index}>
                    {item.product_name}
                    {" $" + item.product_price}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogOrderCard;
