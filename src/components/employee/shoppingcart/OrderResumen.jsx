import { useState, useEffect } from "react";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";
import { capitalizeText } from "../../../utils/textHelper";

const OrderResumen = ({ orderList }) => {
  const [total, setTotal] = useState();
  const [productCount, setProductCount] = useState();
  const [matricula, setMatricula] = useState();
  const [clientType, setClientType] = useState();

  useEffect(() => {
    setClientType(getDataLocalStorage("client_type"));
    setMatricula(getDataLocalStorage("matricula"));
    let auxTotal = 0;
    if (orderList) {
      orderList.forEach((element) => {
        auxTotal += element.product_price;
      });
      setTotal(auxTotal);
      setProductCount(orderList.length);
    }
  }, [orderList]);

  const goBack = () => {
    window.location = "/home/menu";
  };

  return (
    <div className="rounded-3xl w-1/2 h-5/6 bg-white-100 shadow-2xl">
      <div className="flex flex-col items-center justify-center p-8 h-3/4">
        <h1 className="text-3xl font-bold">Resumen del pedido</h1>
        <p className="text-2xl mt-4">
          Total:{" "}
          <span className="text-uv-blue">${total && total.toFixed(2)}</span>
        </p>
        <p className="text-2xl mt-2">
          Número de productos:{" "}
          <span className="text-uv-blue">{productCount && productCount}</span>
        </p>
        <p className="text-2xl mt-2">
          {capitalizeText(clientType) + ": "}
          <span className="text-uv-blue">{matricula}</span>
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
        <button className="rounded-br-3xl bg-uv-green text-white-100 w-1/2 h-full">
          COMPRAR
        </button>
      </div>
    </div>
  );
};

export default OrderResumen;
