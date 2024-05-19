import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet, axiosPost } from "../utils/axiosHelper";
import OrderList from "../components/employee/shoppingcart/OrderList";
import OrderResumen from "../components/employee/shoppingcart/OrderResumen";

const ShoppingCart = () => {
  const [order, setOrder] = useState();
  const [diningId, setDiningId] = useState();
  const [orderNum, setOrderNum] = useState();

  useEffect(() => {
    const auxDiningId = getDiningId();
    if (auxDiningId) {
      getOrderNumber(auxDiningId);
    }
    const orderData = getDataLocalStorage("order");
    setOrder(orderData);
  }, []);

  const getDiningId = () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data) {
      setDiningId(data.dining_room_id);
      return data.dining_room_id;
    } else {
      return undefined;
    }
  };

  const getOrderNumber = async (diningId) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/ordersnum/${diningId}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setOrderNum(result.data.order_num);
    }
  };

  console.log("DINING ID:", diningId);
  console.log("ORDER NUM:", orderNum);

  return (
    <>
      <h1 className="font-bold text-4xl w-full text-center py-4">Carrito</h1>
      <div className="flex flex-row gap-8 p-8 h-screen">
        <OrderList orderList={order} setOrderList={setOrder} />
        <OrderResumen orderList={order} />
      </div>
    </>
  );
};

export default ShoppingCart;
