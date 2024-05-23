import { useState, useEffect } from "react";

const TicketMsg = ({ total, onCreateOrder, orderList, orderNum }) => {
  const [date, setDate] = useState();

  useEffect(() => {
    const d = new Date();
    setDate(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`);
  }, []);

  const addUnderscores = (textName, textPrice) => {
    const maxLength = 50 - textName.length - String(textPrice).length;
    let textResult = "";
    while (textResult.length < maxLength) {
      textResult = textResult + "_";
    }
    return textResult;
  };

  const setSelective = (orderSelective) => {
    if (orderSelective) {
      return (
        <div className="text-xl capitalize">
          <span className="font-bold">Ingrediente seleccionado:</span>
          {" " + orderSelective}
        </div>
      );
    }
  };

  const setOptionalList = (optionalList) => {
    if (optionalList.length > 0) {
      return (
        <div className="text-xl capitalize">
          <span className="font-bold">Opcionales seleccionados:</span>
          <ul>
            {optionalList.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return (
    <div className="h-full relative">
      <div className="flex flex-col items-center px-10 w-full h-3/4 overflow-y-scroll">
        <h3 className="text-2xl capitalize mb-2">
          ** toma una foto a esta pantalla **
        </h3>
        <div className="text-xl w-full flex justify-around">
          <div>Estudiante UV</div>
          <div>{date}</div>
        </div>
        <div className="text-4xl font-extrabold m-2">
          <h2>NÚMERO DE ORDEN: {orderNum}</h2>
        </div>
        <div className="w-full">
          <ul className="w-full">
            {orderList.map((item, index) => {
              return (
                <li key={index} className="w-full mt-2">
                  <div className="text-xl w-full flex justify-center">
                    <span>{item.product_name}</span>
                    {addUnderscores(item.product_name, item.product_price)}
                    <span>${item.product_price.toFixed(2)}</span>
                  </div>
                  {setSelective(item.order_selective)}
                  {setOptionalList(item.order_optionals)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="w-full flex justify-center items-center px-16">
          <hr className="h-1 w-full rounded-full" />
        </div>
        <div className="w-full flex justify-end text-2xl my-4 px-16">
          <h3>TOTAL: ${total.toFixed(2)}</h3>
        </div>
        <div
          onClick={onCreateOrder}
          className="bg-uv-green w-full py-6 rounded-b-3xl cursor-pointer"
        >
          <button className="text-3xl font-bold text-white-100">
            Finalizar Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketMsg;
