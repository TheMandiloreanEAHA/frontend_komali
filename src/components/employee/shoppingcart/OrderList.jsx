import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { saveDataLocalStorage } from "../../../utils/localStorageHelper";

const OrderList = ({ orderList, setOrderList }) => {
  const deleteProduct = (index) => {
    setOrderList((orderList) => {
      return orderList.filter((_, i) => i !== index);
    });
  };

  useEffect(() => {
    if (orderList) {
      saveDataLocalStorage("order", orderList);
    }
  }, [orderList]);

  return (
    <div className="p-8 bg-uv-light-blue shadow-lg rounded-3xl w-1/2 h-5/6 overflow-y-scroll">
      <div className="w-full grid gap-8">
        {orderList ? (
          orderList.map((item, index) => {
            return (
              <OrderCard
                data={item}
                key={index}
                index={index}
                deleteProduct={deleteProduct}
              />
            );
          })
        ) : (
          <div className="w-full text-center">
            <span>Carrito vacio</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
