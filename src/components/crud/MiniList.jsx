import React from "react";

const MiniList = ({ list, setList }) => {
  const onDeleteOptional = (index) => {
    const newList = list.filter((item, i) => i !== index);
    setList(newList);
  };

  return (
    <div className="w-full h-32 bg-gray-100 rounded-lg p-4 overflow-y-auto my-2">
      <div className="grid grid-cols-2 gap-2">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div className="bg-gray-300 rounded-md relative" key={index}>
              <span className="capitalize">{item}</span>
              <div
                className="absolute right-0 top-0 h-full w-8 bg-gray-600 rounded-r-md cursor-pointer text-white-100"
                onClick={() => onDeleteOptional(index)}
              >
                x
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-left text-gray-600">Lista vacía</div>
        )}
      </div>
    </div>
  );
};

export default MiniList;
