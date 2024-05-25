import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../../utils/axiosHelper";
import OrderCard from "./OrderCard";

const OrderList = () => {
  const [ordersData, setOrdersData] = useState();
  const [diningId, setDiningId] = useState();

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  const getOrdersByDining = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    const url = `http://127.0.0.1:8000/orders/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      const grouped = groupBy(result.data, (order) => order.order_num);
      const dataResult = Array.from(grouped.values());
      setOrdersData(dataResult);
    }
  };

  const onDeleteOrder = (index) => {
    const newOrdersData = ordersData.filter((_, i) => i !== index);
    setOrdersData(newOrdersData);
  };

  useEffect(() => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    setDiningId(dining_room_id);
    const initOrderList = async () => {
      await getOrdersByDining();
      setInterval(getOrdersByDining, 30000);
    };
    initOrderList();
  }, []);

  return (
    <div className="bg-white-100 h-screen w-full rounded-3xl p-6 overflow-y-auto">
      {ordersData && ordersData.length > 0 ? (
        <div className="grid grid-cols-2 gap-6">
          {ordersData.map((item, index) => {
            return (
              <OrderCard
                orderData={item}
                key={index}
                index={index}
                onDeleteOrder={onDeleteOrder}
                diningId={diningId}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-full w-full flex justify-center pt-16">
          <p className="text-3xl font-bold">Sin ordenes pendientes</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
