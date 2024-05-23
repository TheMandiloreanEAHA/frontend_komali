import React from "react";

const OrderCard = ({ orderData }) => {
  console.log(orderData);
  return (
    <div className="bg-gray-100 rounded-3xl">
      <div className="bg-uv-blue w-full rounded-t-3xl text-white-100 text-2xl text-center font-bold py-2">
        ORDEN:
      </div>
      <div className="p-6">
        {orderData &&
          orderData.map((item, index) => {
            return <p>{item.product_name}</p>;
          })}
      </div>
      <div className="bg-uv-green w-full rounded-b-3xl text-white-100 text-2xl text-center font-bold py-2">
        ENTREGADA
      </div>
    </div>
  );
};

export default OrderCard;
