import { useEffect, useState } from "react";
import AlertMsg from "./AlertMsg";
import TicketMsg from "./TicketMsg";
import SuccessMsg from "./SuccessMsg";

const OrderModal = ({ orderList, onCreateOrder, onCloseModal, orderNum }) => {
  const [total, setTotal] = useState(0);
  const [showTicket, setShowTicket] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let auxTotal = 0;
    if (orderList) {
      orderList.forEach((element) => {
        auxTotal += element.product_price;
      });
      setTotal(auxTotal);
    }
  }, [orderList]);

  const getStep = () => {
    switch (step) {
      case 0:
        return <AlertMsg total={total} setStep={setStep} />;
      case 1:
        return (
          <TicketMsg
            total={total}
            setStep={setStep}
            orderList={orderList}
            orderNum={orderNum}
          />
        );
      case 2:
        return <SuccessMsg onCreateOrder={onCreateOrder} />;
      default:
        break;
    }
  };

  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-50 fixed bottom-0 right-0 flex justify-center items-center text-center">
      <div className="bg-white-100 rounded-3xl h-4/5 w-4/5">
        <div className="flex justify-end text-2xl pr-6 pt-5">
          <button onClick={() => onCloseModal()}>X</button>
        </div>
        <div className="h-full">{getStep()}</div>
      </div>
    </div>
  );
};

export default OrderModal;
