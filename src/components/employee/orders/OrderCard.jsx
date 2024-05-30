import { useState, useEffect } from "react";
import { axiosDelete } from "../../../utils/axiosHelper";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";
import { API_URL } from "../../../config/config";

const OrderCard = ({ orderData, index, onDeleteOrder, diningId }) => {
  const [orderNum, setOrderNum] = useState(undefined);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let auxTotal = 0;
    if (orderData) {
      orderData.forEach((element) => {
        auxTotal += element.product_price;
      });
      setTotal(auxTotal);
    }
  }, [orderData]);

  const deleteOrderByNum = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}orders/${diningId}/${orderNum}`;
    const result = await axiosDelete(url, token);
    if (result !== undefined) {
      return result;
    }
  };

  const onFinishOrder = async () => {
    const result = await deleteOrderByNum();
    if (result && result.status === 200) {
      onDeleteOrder(index);
    }
  };

  return (
    <div className="bg-gray-100 rounded-3xl flex flex-col justify-between">
      <div className="bg-uv-blue w-full rounded-t-3xl text-white-100 text-2xl text-center font-bold py-2 flex justify-around">
        <div>ORDEN:{" " + orderNum}</div>
        <div>Total:{" $" + total.toFixed(2)}</div>
      </div>
      <div className="p-6 capitalize text-2xl">
        {orderData &&
          orderData.map((item, index) => {
            if (orderNum === undefined || orderNum !== item.order_num) {
              setOrderNum(item.order_num);
            }
            return (
              <div key={index}>
                <div className="flex justify-between">
                  <p className="font-bold text-uv-blue">{item.product_name}</p>
                  {item.order_selective && (
                    <p>
                      <span className="font-bold">Ingrediente:</span>{" "}
                      <span className="capitalize">{item.order_selective}</span>
                    </p>
                  )}
                </div>
                {item.order_optionals && item.order_optionals.length > 0 && (
                  <div>
                    <p className="font-bold">Opcionales:</p>
                    <ul className="list-disc pl-6 flex justify-between">
                      {item.order_optionals.map((optionalItem, index) => {
                        return <li key={index}>{optionalItem}</li>;
                      })}
                    </ul>
                  </div>
                )}
                {index !== orderData.length - 1 && (
                  <hr className="w-full h-0.5 my-4 bg-gray-200 rounded" />
                )}
              </div>
            );
          })}
      </div>
      <div
        onClick={onFinishOrder}
        className="bg-uv-green w-full rounded-b-3xl text-white-100 text-2xl text-center font-bold py-2 cursor-pointer"
      >
        ENTREGADA
      </div>
    </div>
  );
};

export default OrderCard;
