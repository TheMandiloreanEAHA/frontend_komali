import React from "react";
import categoryGenericIcon from "../../assets/categoryGenericIcon.svg";

const CategoryCard = ({ categoryData }) => {
  const categoryImg = categoryData.category_img;
  const categoryName = categoryData.category_name;

  const setCategoryImg = () => {
    if (categoryImg) {
      return `data:image/png;base64,${categoryImg}`;
    } else {
      return categoryGenericIcon;
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
