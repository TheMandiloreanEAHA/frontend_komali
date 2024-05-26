import { useEffect, useState } from "react";
import { axiosGet } from "../../utils/axiosHelper";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import CategoryCard from "./CategoryCard";

const SideMenu = ({ diningRoom, onSetSelectedCategory }) => {
  const [categoriesFilter, setCategoriesFilter] = useState();

  useEffect(() => {
    const initSideMenu = async () => {
      const categoriesResult = await getCategories();
      const countResult = await getCategoryCount(diningRoom.dining_id);
      if (categoriesResult !== undefined && countResult !== undefined) {
        getActiveCategories(categoriesResult, countResult);
      }
    };
    initSideMenu();
  }, []);

  const getCategories = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/categories/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      return result.data;
    } else {
      return undefined;
    }
  };

  const getCategoryCount = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/counter/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      return result.data;
    } else {
      return undefined;
    }
  };

  const setSelectCategory = (category_id) => {
    onSetSelectedCategory(category_id);
  };

  const getActiveCategories = (categories, categoryCount) => {
    const categoriesFilter = [];
    categories.forEach((category) => {
      categoryCount.forEach((element) => {
        if (category.category_id === element.category_id) {
          categoriesFilter.push(category);
        }
      });
    });
    setCategoriesFilter(categoriesFilter);
    if (categoriesFilter.length > 0) {
      onSetSelectedCategory(categoriesFilter[0].category_id);
    }
  };

  return (
    <div className="p-6 bg-uv-green rounded-3xl h-screen w-full overflow-y-auto">
      <div className="h-fit text-center grid grid-cols-1 gap-6">
        <div className="flex flex-col justify-center items-center w-full h-20 rounded-2xl bg-white-100 text-uv-blue px-4 font-bold text-2xl">
          <h4>MENÚ</h4>
        </div>
        {categoriesFilter ? (
          categoriesFilter.map((item) => {
            return (
              <div
                key={item.category_id}
                onClick={() => {
                  setSelectCategory(item.category_id);
                }}
                className="rounded-2xl bg-white-100 shadow-md cursor-pointer w-full aspect-square p-2 flex justify-center items-center"
              >
                <CategoryCard categoryData={item} />
              </div>
            );
          })
        ) : (
          <span>...</span>
        )}
      </div>
    </div>
  );
};

export default SideMenu;
