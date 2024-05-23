import React from "react";

const HiddenSideBar = () => {
  return (
    <div className="w-full h-full rounded-3xl flex flex-col text-white-100 text-center bg-white-100">
      <div className="bg-uv-blue h-16 mb-6 rounded-t-3xl">Icon</div>
      <div className="grid gap-8 justify-center">
        <div className="bg-uv-green w-20 h-20 rounded-full">CurrentOrders</div>
        <div className="bg-uv-blue w-20 h-20 rounded-full">CompletedOrders</div>
      </div>
    </div>
  );
};

export default HiddenSideBar;
