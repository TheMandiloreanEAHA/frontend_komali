import { useState, useEffect } from "react";
import { getDataLocalStorage } from "../../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../../utils/axiosHelper";
import LogOrderCard from "./LogOrderCard";
import { API_URL } from "../../../config/config";

const LogOrderList = () => {
  const [orderLogData, setOrderLogData] = useState();
  const [diningId, setDiningId] = useState();

  useEffect(() => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    setDiningId(dining_room_id);
    const initOrderLogData = async () => {
      await getOrdersLogByDining();
    };
    initOrderLogData();
  }, []);

  const getOrdersLogByDining = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    const url = `${API_URL}orders_log/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setOrderLogData(result.data);
    }
  };

  return (
    <div className="bg-white-100 h-screen w-full rounded-3xl p-6 overflow-y-auto">
      <div className="grid grid-cols-2 gap-6">
        {orderLogData &&
          orderLogData.map((item, index) => {
            return (
              <div key={index}>
                <LogOrderCard orderLogData={item} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LogOrderList;
