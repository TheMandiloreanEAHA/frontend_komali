import { useState } from "react";
import TopBar from "../components/TopBar";
import HiddenSideBar from "../components/employee/orders/HiddenSideBar";
import SideBar from "../components/employee/orders/SideBar";
import OrderList from "../components/employee/orders/OrderList";
import LogOrderList from "../components/employee/orders/LogOrderList";

const Order = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [list, setList] = useState(true);

  return (
    <>
      <TopBar />
      <div className="w-full h-full bg-gray-100 flex">
        <div
          className="m-6"
          onMouseEnter={() => setShowSideBar(true)}
          onMouseLeave={() => setShowSideBar(false)}
        >
          {showSideBar ? (
            <div className="w-60 h-full">
              <SideBar setList={setList} />
            </div>
          ) : (
            <div className="w-32 h-full">
              <HiddenSideBar />
            </div>
          )}
        </div>
        <div className="w-full h-full my-6 mr-6">
          {list ? <OrderList /> : <LogOrderList />}
        </div>
      </div>
    </>
  );
};

export default Order;
