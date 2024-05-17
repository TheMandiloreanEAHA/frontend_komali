import { useEffect, useState } from "react";
import {
  saveDataLocalStorage,
  getDataLocalStorage,
} from "../../utils/localStorageHelper";

const ProductModal = ({ closeModal, productInfo }) => {
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

  const [selective, setSelective] = useState(0);
  const [optionalsChecked, setOptionalsChecked] = useState();

  useEffect(() => {
    if (productOptionals) {
      setOptionalsChecked(new Array(productOptionals.length).fill(false));
    }
  }, []);

  const onSetSelective = (index) => {
    setSelective(index);
  };

  const onSetOptional = (position) => {
    const updateOptionalsChecked = optionalsChecked.map((item, index) =>
      index === position ? !item : item
    );
    setOptionalsChecked(updateOptionalsChecked);
  };

  const goShoppingCart = () => {
    window.location = "/home/cart";
  };

  const onBuyProduct = () => {
    const order = createOrder();
    saveDataLocalStorage("order", [order]);
    goShoppingCart();
  };

  const onAddProduct = () => {
    const order = createOrder();
    let currentOrder = getDataLocalStorage("order");
    if (currentOrder !== undefined && currentOrder.length > 0) {
      currentOrder.push(order);
      saveDataLocalStorage("order", currentOrder);
    } else {
      saveDataLocalStorage("order", [order]);
    }
    closeModal();
  };

  const createOrder = () => {
    const optionalsList = [];
    if (productOptionals && productOptionals.length > 0) {
      optionalsChecked.map((item, index) => {
        if (item) {
          optionalsList.push(productOptionals[index]);
        }
      });
    }
    let selectiveItem = "";
    if (productSelectives && productSelectives.length > 0) {
      selectiveItem = productSelectives[selective];
    }
    const order = {
      product_id: productId,
      dining_id: diningId,
      order_optionals: optionalsList,
      order_selectives: selectiveItem,
    };
    return order;
  };

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
        {productSelectives && (
          <>
            <div className="text-xl">Elige tu opción preferida:</div>
            <div className="grid grid-cols-2 gap-4 p-4">
              {productSelectives.map((item, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={index}
                    name="product_seletives"
                    checked={selective === index}
                    onChange={() => onSetSelective(index)}
                  />
                  <span className="pl-2">{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
        {productOptionals && (
          <>
            <div className="text-xl">
              ¿Quieres agregar u omitir algún ingrediente?:
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              {productOptionals.map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    name="product_optionals"
                    id={index}
                    checked={optionalsChecked ? optionalsChecked[index] : false}
                    onChange={() => onSetOptional(index)}
                  />
                  <span className="pl-2">{item}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="text-2xl pb-4 text-uv-blue flex justify-around">
          <span>${productPrice}</span>
          <span>${productStudentPrice}</span>
        </div>
        <div className="w-full h-auto text-center text-white-100">
          <button
            onClick={onBuyProduct}
            className="font-bold bg-uv-blue w-1/2 h-full rounded-bl-2xl p-4"
          >
            COMPRAR
          </button>
          <button
            onClick={onAddProduct}
            className="font-bold bg-uv-green w-1/2 h-full rounded-br-2xl p-4"
          >
            AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;