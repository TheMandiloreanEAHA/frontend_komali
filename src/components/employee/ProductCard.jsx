import React from "react";
import { base64ToFile, fileToURL } from "../../utils/imageHelper";

const ProductCard = ({ productData, openModal }) => {
  const productId = productData.product_id;
  const productImg = base64ToFile(productData.product_img);
  const productName = productData.product_name;
  const productPrice = productData.product_price.toFixed(2);
  const productStudentPrice = productData.product_student_price.toFixed(2);

  console.log(productData.product_img);

  return (
    <div className="rounded-3xl bg-white-100 h-fit">
      <div className="mx-8 mt-8 w-auto aspect-video bg-gray-100 rounded-2xl flex justify-center items-center p-4">
        <img
          className="h-32"
          src={fileToURL(productImg)}
          alt="Imagen de producto"
        />
      </div>
      <h4 className="text-2xl my-2 capitalize">{productName}</h4>
      <div className="text-2xl mb-2 text-uv-blue flex justify-around">
        <span>${productPrice}</span>
      </div>
      <div className="w-full h-auto text-center text-white-100 flex">
        <div
          onClick={() => openModal(productData)}
          className="font-bold bg-uv-blue w-1/2 h-16 rounded-bl-2xl p-4 flex justify-center items-center"
        >
          COMPRAR
        </div>
        <div
          onClick={() => openModal(productData)}
          className="font-bold bg-uv-green w-1/2 h-16 rounded-br-2xl p-4 flex justify-center items-center"
        >
          AL CARRITO
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
