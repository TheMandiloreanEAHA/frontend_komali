import { useEffect, useState } from "react";
import {
  saveDataLocalStorage,
  getDataLocalStorage,
} from "../../utils/localStorageHelper";
import { base64ToFile, fileToURL } from "../../utils/imageHelper";

const ProductModal = ({
  closeModal,
  productInfo,
  openTemporalModal,
  setVisibleShoppingCart,
}) => {
  const productId = productInfo.product_id;
  const productName = productInfo.product_name;
  const productPrice = productInfo.product_price;
  const productStudentPrice = productInfo.product_student_price;
  const productCalories = productInfo.product_calories;
  const productOptionals = productInfo.product_optionals;
  const productSelectives = productInfo.product_selectives;
  const productDescription = productInfo.product_description;
  const categoryId = productInfo.category_id;
  const diningId = productInfo.dining_id;
  const productImg = base64ToFile(productInfo.product_img);

  const [selective, setSelective] = useState(0);
  const [optionalsChecked, setOptionalsChecked] = useState();

  useEffect(() => {
    setVisibleShoppingCart(false);
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
    openTemporalModal();
    setVisibleShoppingCart(true);
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
      product_name: productName,
      product_price: productPrice,
      product_student_price: productStudentPrice,
      product_calories: productCalories,
      order_optionals: optionalsList,
      order_selective: selectiveItem,
      product_description: productDescription,
      category_id: categoryId,
      dining_id: diningId,
      product_img: productImg,
    };
    return order;
  };

  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-50 fixed bottom-0 right-0 flex justify-center items-center text-center">
      <div className="bg-white-100 rounded-3xl h-auto w-3/5">
        <div className="relative w-full">
          <h2 className="text-3xl m-6 font-bold">{productName}</h2>
          <div className="flex justify-end text-xl pr-6 font-bold absolute -top-1 right-0">
            <button
              onClick={() => {
                closeModal();
                setVisibleShoppingCart(true);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          {/* DIV IMAGEN CON CALORIAS */}
          <div className="px-8 pb-8 w-1/2">
            <div className="w-full aspect-square bg-gray-100 rounded-2xl flex justify-center items-center p-8">
              <img
                src={fileToURL(productImg)}
                alt="Imagen de producto"
                className="h-50"
              />
            </div>
            <div className="text-2xl flex justify-around m-4">
              <p className="text-justify">
                Descripción:{" "}
                <span className="text-uv-blue">{productDescription}</span>
              </p>
            </div>
          </div>
          <div className="h-full w-1/2 flex flex-col pb-8 pr-8">
            {/* DIV PERSONALIZAR PEDIDO Y PRECIO */}
            {productSelectives && (
              <>
                <div className="text-2xl">Elige tu opción preferida:</div>
                <div className="grid grid-cols-2 gap-4 p-4">
                  {productSelectives.map((item, index) => (
                    <div
                      className="flex items-center justify-evenly"
                      key={index}
                    >
                      <input
                        className="w-5 h-5"
                        type="radio"
                        id={index}
                        name="product_seletives"
                        checked={selective === index}
                        onChange={() => onSetSelective(index)}
                      />
                      <span className="text-2xl capitalize">{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {productOptionals && (
              <>
                <div className="text-2xl">
                  ¿Deseas agregar u omitir algún ingrediente?:
                </div>
                <div className="grid grid-cols-2 gap-4 p-2">
                  {productOptionals.map((item, index) => (
                    <div
                      className="flex items-center justify-evenly"
                      key={index}
                    >
                      <input
                        className="w-5 h-5"
                        type="checkbox"
                        name="product_optionals"
                        id={index}
                        checked={
                          optionalsChecked ? optionalsChecked[index] : false
                        }
                        onChange={() => onSetOptional(index)}
                      />
                      <span className="text-2xl capitalize">{" " + item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            <div className="w-full my-4 flex items-center justify-center">
              <hr className="h-0.5 w-3/4 bg-gray-300 border-0 rounded-full" />
            </div>
            <div className="text-2xl flex justify-around">
              <span>Calorias: </span>
              <span className="text-2xl text-uv-green">{productCalories}</span>
            </div>
            <div className="text-2xl flex justify-around mt-4">
              <span>Precio: </span>
              <span className="text-2xl text-uv-blue">
                ${productStudentPrice}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full h-auto text-center text-2xl text-white-100">
          <button
            onClick={onBuyProduct}
            className="font-bold bg-uv-blue w-1/2 h-full rounded-bl-2xl p-6"
          >
            COMPRAR
          </button>
          <button
            onClick={onAddProduct}
            className="font-bold bg-uv-green w-1/2 h-full rounded-br-2xl p-6"
          >
            AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
