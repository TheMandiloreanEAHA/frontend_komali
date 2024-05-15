import React from "react";

const ProductCard = ({ productData, openModal }) => {
  const productId = productData.product_id;
  const productImg = productData.product_img;
  const productName = productData.product_name;
  const productPrice = productData.product_price.toFixed(2);
  const productStudentPrice = productData.product_student_price.toFixed(2);

  return (
    <div className="rounded-3xl bg-white-100">
      <div className="mx-8 mt-8 w-auto h-56 bg-gray-100 rounded-2xl flex justify-center items-center">
        <img src={productImg} alt="Imagen de producto" />
      </div>
      <h4 className="text-2xl p-4">{productName}</h4>
      <div className="text-2xl pb-4 text-uv-blue flex justify-around">
        <span>${productPrice}</span>
        <span>${productStudentPrice}</span>
      </div>
      <div className="w-full text-center text-white-100">
        <button
          onClick={() => openModal(productData)}
          className="font-bold bg-uv-blue w-1/2 h-full rounded-bl-2xl p-4"
        >
          COMPRAR
        </button>
        <button
          onClick={() => openModal(productData)}
          className="font-bold bg-uv-green w-1/2 h-full rounded-br-2xl p-4"
        >
          AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
