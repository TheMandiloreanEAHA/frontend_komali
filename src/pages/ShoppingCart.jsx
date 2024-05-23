import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet, axiosPost } from "../utils/axiosHelper";
import OrderList from "../components/employee/shoppingcart/OrderList";
import OrderResumen from "../components/employee/shoppingcart/OrderResumen";
import OrderModal from "../components/employee/shoppingcart/OrderModal";

const ShoppingCart = () => {
  const [order, setOrder] = useState();
  const [diningId, setDiningId] = useState();
  const [orderNum, setOrderNum] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(order, diningId, orderNum);

  useEffect(() => {
    const initShoppingCart = async () => {
      const diningAux = await getDiningId();
      if (diningAux) {
        const orderNumAux = await getOrderNumber(diningAux);
        setOrderNum(orderNumAux);
      }
      const orderData = getDataLocalStorage("order");
      setOrder(orderData);
    };
    initShoppingCart();
  }, []);

  const getDiningId = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data) {
      setDiningId(data.dining_room_id);
      return data.dining_room_id;
    }
    return undefined;
  };

  const getOrderNumber = async (diningId) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/ordersnum/${diningId}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      return result.data.order_num;
    }
    return undefined;
  };

  const createOrder = () => {
    const orderList = [];
    order.forEach((element) => {
      const orderAux = {
        product_id: element.product_id,
        dining_id: element.dining_id,
        order_num: orderNum,
        order_optionals: element.order_optionals,
        order_selective: element.order_selective,
      };
      orderList.push(orderAux);
    });
    const finalOrderRequest = {
      order_num: orderNum,
      dining_id: diningId,
      product_list: orderList,
    };
    insertOrder(finalOrderRequest);
  };

  const insertOrder = async (request) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/orders/`;
    const result = await axiosPost(url, request, token);
    if (result !== undefined) {
      if (result.status === 200) {
        goScanScreen();
      }
    }
  };

  const goScanScreen = () => {
    window.location = "/home/scan";
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1 className="font-bold text-4xl w-full text-center py-4">Carrito</h1>
      <div className="flex flex-row gap-8 p-8 h-screen">
        <OrderList orderList={order} setOrderList={setOrder} />
        <OrderResumen orderList={order} onOpenModal={setIsModalOpen} />
        {isModalOpen && (
          <OrderModal
            orderList={order}
            onCreateOrder={createOrder}
            onCloseModal={onCloseModal}
            orderNum={orderNum}
          />
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
