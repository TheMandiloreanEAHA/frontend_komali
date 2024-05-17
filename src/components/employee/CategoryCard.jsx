import React from "react";
import finger from "../../assets/finger.svg";

const CategoryCard = ({ categoryData }) => {
  const categoryId = categoryData.category_id;
  const categoryImg = categoryData.category_img;
  const categoryName = categoryData.category_name;

  const setCategoryImg = () => {
    if (categoryImg) {
      return categoryImg;
    } else {
      return finger;
    }
  };

  return (
    <>
      <img className="w-auto h-fit" src={setCategoryImg()} alt={categoryName} />
      <h4 className="pt-4 font-bold text-xl w-auto">
        {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
      </h4>
    </>
  );
};

export default CategoryCard;
