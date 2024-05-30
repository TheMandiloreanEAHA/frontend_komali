import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import ProductCard from "./ProductCard";
import { API_URL } from "../../config/config";

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
    const url = `${API_URL}products/${dining_room_id}/${selectedCategory}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setProductList(result.data);
    }
  };

  const onSearchProduct = async (e) => {
    const value = e.target.value;
    if (value !== "") {
      const token = getDataLocalStorage("token");
      const data = jwtDecode(token);
      const dining_room_id = data.dining_room_id;
      const url = `${API_URL}products/search/${dining_room_id}/${value}`;
      const result = await axiosGet(url, token);
      if (result !== undefined) {
        setProductList(result.data);
      }
    }
  };

  return (
    <div className="h-full">
      <form>
        <div className="flex">
          <div className="relative w-full">
            <input
              type="search"
              className="block p-3 w-full z-20 text-lg text-gray-900 bg-gray-50 rounded-full border-4 border-uv-blue focus:ring-blue-500 focus:border-blue-500"
              placeholder="Buscar"
              onChange={onSearchProduct}
              required
            />
            <button className="absolute top-0 end-0 pr-6 pl-5 h-full text-lg font-medium text-white bg-uv-blue rounded-e-full">
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="#fff"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>

      <div className="p-8 bg-uv-light-green rounded-3xl h-full text-center grid grid-cols-3 gap-8 overflow-y-auto shadow-lg">
        {productList ? (
          productList.map((item, index) => {
            return (
              <ProductCard
                key={index}
                productData={item}
                openModal={openModal}
              />
            );
          })
        ) : (
          <span>Cargando productos...</span>
        )}
      </div>
    </div>
  );
};

export default ProductList;
