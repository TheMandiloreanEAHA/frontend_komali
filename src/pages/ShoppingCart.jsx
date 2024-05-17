import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";

const ShoppingCart = () => {
  const [order, setOrder] = useState();
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    setOrder(getDataLocalStorage("order"));
  }, []);

  return (
    <>
      <ul>
        {order &&
          order.map((item, index) => {
            return <li key={index}>{JSON.stringify(item)}</li>;
          })}
      </ul>
    </>
  );
};

export default ShoppingCart;
