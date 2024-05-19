import React from "react";
import { capitalizeText } from "../../../utils/textHelper";

const OrderCard = ({ data, index, deleteProduct }) => {
  console.log(data);
  return (
    <div className="rounded-2xl bg-white-100 h-fit flex shadow-md">
      <div className="w-4/5 p-4 flex">
        <div className="w-1/4 aspect-square bg-gray-200 rounded-2xl">
          <img src={data.product_img} alt="producto" />
        </div>
        <div className="w-3/4 pl-4 flex flex-col justify-around">
          <strong className="text-xl">
            {capitalizeText(data.product_name)}
          </strong>
          {data.order_selectives && (
            <p className="text-lg">{capitalizeText(data.order_selectives)}</p>
          )}
          {data.order_optionals.length > 0 &&
            data.order_optionals.map((item, index) => {
              return <li className="text-lg">{capitalizeText(item)}</li>;
            })}
          <p className="text-uv-blue font-bold text-lg">
            ${data.product_price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        className="bg-red-600 w-1/5 rounded-r-2xl"
        onClick={() => {
          deleteProduct(index);
        }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default OrderCard;
