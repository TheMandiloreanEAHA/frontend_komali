import { useState } from "react";

const ProductModal = ({ isOpen, closeModal, productInfo }) => {
  const categoryId = productInfo.category_id;
  const diningId = productInfo.dining_id;
  const isActive = productInfo.is_active;
  const productDescription = productInfo.product_description;
  const productId = productInfo.product_id;
  const productImg = productInfo.product_img;
  const productName = productInfo.product_name;
  const productOptionals = productInfo.product_optionals;
  const productPrice = productInfo.product_price;
  const productSelectives = productInfo.product_selectives;
  const productStudentPrice = productInfo.product_student_price;

  if (!isOpen) return null;
  console.log(productInfo);
  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-50 fixed bottom-0 right-0 flex justify-center items-center text-center">
      <div className="bg-white-100 rounded-3xl h-auto w-1/2">
        <div className="flex justify-end pt-4 pr-6">
          <button onClick={() => closeModal()}>X</button>
        </div>
        <div className="mx-8 mt-4 w-auto h-56 bg-gray-100 rounded-2xl flex justify-center items-center">
          <img src={productImg} alt="Imagen de producto" />
        </div>
        <h4 className="text-2xl p-4">{productName}</h4>
        <div className="text-2xl pb-4 text-uv-blue flex justify-around">
          <span>${productPrice}</span>
          <span>${productStudentPrice}</span>
        </div>
        <div className="w-full h-auto text-center text-white-100">
          <button className="font-bold bg-uv-blue w-1/2 h-full rounded-bl-2xl p-4">
            COMPRAR
          </button>
          <button className="font-bold bg-uv-green w-1/2 h-full rounded-br-2xl p-4">
            AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
