import React from "react";
import finger from "../../assets/finger.svg";

const CategoryCard = ({ categoryData }) => {
  const categoryId = categoryData.category_id;
  const categoryImg = categoryData.category_img;
  const categoryName = categoryData.category_name;

  const setCategoryImg = () => {
    if (categoryImg) {
      return `data:image/png;base64,${categoryImg}`;
    } else {
      return finger;
    }
  };

  return (
    <div className="h-24 w-24 flex flex-col justify-center items-center">
      <img src={setCategoryImg()} alt={categoryName} />
      <h4 className="font-bold text-lg w-auto capitalize">{categoryName}</h4>
    </div>
  );
};

export default CategoryCard;
