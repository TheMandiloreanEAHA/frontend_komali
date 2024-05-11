import React from "react";

const ProductCard = ({ productData }) => {
  const productId = productData.product_id;
  const productImg = productData.product_img;
  const productName = productData.product_name;
  const productPrice = productData.product_price;
  const productStudendPrice = productData.product_student_price;

  return (
    <div className="rounded-3xl bg-white-100">
      <div className="m-8 w-auto h-48 bg-gray-300 rounded-2xl">
        <img src={productImg} alt="Imagen de producto" />
      </div>
      <h4>{productName}</h4>
      <div>
        <span>{productPrice}</span> <span>{productStudendPrice}</span>
      </div>
      <div className="w-full text-center text-white-100">
        <button className="font-bold bg-uv-blue w-1/2 rounded-bl-2xl p-4">
          COMPRAR
        </button>
        <button className="font-bold bg-uv-green w-1/2 rounded-br-2xl p-4">
          AL CARRITO
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
