import React from "react";
import trashIcon from "../../../assets/trashIcon.svg";
import { fileToURL, base64ToFile } from "../../../utils/imageHelper";

const OrderCard = ({ data, index, deleteProduct }) => {
  const productImg = base64ToFile(data.product_img);
  return (
    <div className="rounded-2xl bg-white-100 h-fit flex shadow-md">
      <div className="w-4/5 p-4 flex">
        <div className="w-1/4 aspect-square bg-gray-200 rounded-2xl flex justify-center items-center">
          <img src={fileToURL(productImg)} alt="producto" />
        </div>
        <div className="w-3/4 pl-4 flex flex-col justify-around">
          <strong className="text-xl capitalize">{data.product_name}</strong>
          <p className="text-uv-green text-xl">
            {data.product_calories + " "}cal
          </p>
          {data.order_selectives && (
            <p className="text-lg capitalize">{data.order_selectives}</p>
          )}
          {data.order_optionals &&
            data.order_optionals.length > 0 &&
            data.order_optionals.map((item, index) => {
              return (
                <li key={index} className="text-lg capitalize">
                  {item}
                </li>
              );
            })}
          <p className="text-uv-blue font-bold text-lg">
            ${data.product_price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        className="bg-red-600 w-1/5 rounded-r-2xl p-8"
        onClick={() => {
          deleteProduct(index);
        }}
      >
        <img src={trashIcon} alt="eliminar" />
      </button>
    </div>
  );
};

export default OrderCard;
