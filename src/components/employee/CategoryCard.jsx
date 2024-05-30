import React from "react";
import categoryGenericIcon from "../../assets/categoryGenericIcon.svg";
import { base64ToFile, fileToURL } from "../../utils/imageHelper";

const CategoryCard = ({ categoryData }) => {
  const categoryImg = base64ToFile(categoryData.category_img);
  const categoryName = categoryData.category_name;

  const setCategoryImg = () => {
    if (categoryImg) {
      return fileToURL(categoryImg);
    } else {
      return categoryGenericIcon;
    }
  };

  return (
    <div className="h-24 w-24 flex flex-col justify-center items-center p-2">
      <img src={setCategoryImg()} alt={categoryName} className="h-32" />
      <h4 className="font-bold text-lg w-auto capitalize">{categoryName}</h4>
    </div>
  );
};

export default CategoryCard;
