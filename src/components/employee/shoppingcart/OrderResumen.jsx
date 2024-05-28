import { useState, useEffect } from "react";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";

const OrderResumen = ({ orderList, onOpenModal }) => {
  const [total, setTotal] = useState();
  const [productCount, setProductCount] = useState();
  const [matricula, setMatricula] = useState();
  const [clientType, setClientType] = useState();
  const [calTotal, setCalTotal] = useState();

  useEffect(() => {
    setClientType(getDataLocalStorage("client_type"));
    setMatricula(getDataLocalStorage("matricula"));
    let auxTotal = 0;
    let calTotal = 0;
    if (orderList) {
      orderList.forEach((element) => {
        auxTotal += element.product_price;
        calTotal += element.product_calories;
      });
      setTotal(auxTotal);
      setProductCount(orderList.length);
      setCalTotal(calTotal);
    }
  }, [orderList]);

  const goBack = () => {
    window.location = "/home/menu";
  };

  const setCaloriesColor = () => {
    if (calTotal < 300) {
      return "text-red-600";
    }
    if (calTotal >= 300 && calTotal < 500) {
      return "text-yellow-600";
    }
    if (calTotal >= 500 && calTotal < 700) {
      return "text-green-600";
    }
    if (calTotal >= 700) {
      return "text-red-600";
    }
  };

  return (
    <div className="rounded-3xl w-1/2 h-5/6 bg-uv-light-blue shadow-lg">
      <div className="flex flex-col items-center justify-center p-8 h-3/4">
        <h1 className="text-3xl font-bold">Resumen del pedido</h1>
        <p className="text-2xl mt-4">
          Total:{" "}
          <span className="text-uv-blue font-bold">
            ${total && total.toFixed(2)}
          </span>
        </p>
        <p className="text-2xl mt-2">
          Número de productos:{" "}
          <span className="text-uv-green">{productCount && productCount}</span>
        </p>
        <p className="text-2xl mt-2 capitalize">
          {clientType + ": "}
          <span className="text-uv-blue">{matricula}</span>
        </p>
        <p className="text-2xl mt-2 capitalize">
          Calorias totales:{" "}
          <span className={calTotal && setCaloriesColor()}>{calTotal}</span>
        </p>
      </div>
      <div className="w-full h-1/4 font-bold text-xl">
        <button
          className="
rounded-bl-3xl bg-uv-blue text-white-100 w-1/2 h-full"
          onClick={goBack}
        >
          REGRESAR
        </button>
        <button
          className="rounded-br-3xl bg-uv-green text-white-100 w-1/2 h-full"
          onClick={() => onOpenModal(true)}
        >
          COMPRAR
        </button>
      </div>
    </div>
  );
};

export default OrderResumen;
