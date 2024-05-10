import { useEffect, useState } from "react";
import { axiosGet } from "../../utils/axiosHelper";
import { getDataLocalStorage } from "../../utils/localStorageHelper";

const SideMenu = ({ diningRoom }) => {
  const [categories, setCategories] = useState();
  const [categoryCount, setCategoryCount] = useState();

  useEffect(() => {
    getCategory();
    getCategoryCount(diningRoom.dining_id);
  }, []);

  const getCategory = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/categories/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setCategories(result.data);
    }
  };

  const getCategoryCount = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/counter/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setCategoryCount(result.data);
    }
  };

  return (
    <>
      <div>
        <ul>
          {categories ? (
            categories.map((item, index) => (
              <li key={index}>{item.category_name}</li>
            ))
          ) : (
            <span>...</span>
          )}
        </ul>
      </div>
    </>
  );
};

export default SideMenu;
