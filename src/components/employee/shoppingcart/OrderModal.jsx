import { useEffect, useState } from "react";
import AlertMsg from "./AlertMsg";
import TicketMsg from "./TicketMsg";

const OrderModal = ({ orderList, onCreateOrder, onCloseModal, orderNum }) => {
  const [total, setTotal] = useState(0);
  const [showTicket, setShowTicket] = useState(false);

  const onShowTicket = () => {
    setShowTicket(true);
  };

  useEffect(() => {
    let auxTotal = 0;
    if (orderList) {
      orderList.forEach((element) => {
        auxTotal += element.product_price;
      });
      setTotal(auxTotal);
    }
  }, [orderList]);

  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-50 fixed bottom-0 right-0 flex justify-center items-center text-center">
      <div className="bg-white-100 rounded-3xl h-4/5 w-4/5">
        <div className="flex justify-end text-2xl pr-6 pt-5">
          <button onClick={() => onCloseModal()}>X</button>
        </div>
        <div className="h-full">
          {showTicket ? (
            <TicketMsg
              total={total}
              onCreateOrder={onCreateOrder}
              orderList={orderList}
              orderNum={orderNum}
            />
          ) : (
            <AlertMsg total={total} onShowTicket={onShowTicket} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
