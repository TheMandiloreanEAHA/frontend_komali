import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import ProductCard from "./ProductCard";

const ProductList = ({ selectedCategory }) => {
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
    <div className="p-8 bg-gray-500 rounded-3xl h-auto text-center grid grid-cols-2 gap-8 ">
      {productList ? (
        productList.map((item) => {
          return <ProductCard key={item.producto_id} productData={item} />;
        })
      ) : (
        <span>Cargando productos...</span>
      )}
    </div>
  );
};

export default ProductList;
