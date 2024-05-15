import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import ProductCard from "./ProductCard";

const ProductList = ({ selectedCategory, openModal }) => {
  const [productList, setProductList] = useState();

  useEffect(() => {
    const initProductList = async () => {
      if (selectedCategory) {
        await getProductsByCategory();
      }
    };
    initProductList();
  }, [selectedCategory]);

  const getProductsByCategory = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const dining_room_id = data.dining_room_id;
    const url = `http://localhost:8000/products/${dining_room_id}/${selectedCategory}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      console.log(result);
      setProductList(result.data);
    }
  };

  return (
    <div className="p-8 bg-gray-500 rounded-3xl h-screen text-center grid grid-cols-2 gap-8 overflow-y-scroll">
      {productList ? (
        productList.map((item, index) => {
          return (
            <ProductCard key={index} productData={item} openModal={openModal} />
          );
        })
      ) : (
        <span>Cargando productos...</span>
      )}
    </div>
  );
};

export default ProductList;
