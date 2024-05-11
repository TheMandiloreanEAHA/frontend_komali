import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import SideMenu from "./SideMenu";
import ProductList from "./ProductList";

const Menu = ({ matricula, onChangeMatricula, onChangeScaning }) => {
  const [diningRoomData, setDiningRoomData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const initMenu = async () => {
      const token = getDataLocalStorage("token");
      const data = jwtDecode(token);
      if (data) {
        await getDinerRoomData(data.dining_room_id);
      }
    };
    initMenu();
  }, []);

  const onSetSelectedCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const getDinerRoomData = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/dining-room/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningRoomData(result.data);
    }
  };

  return (
    <>
      <div>Carrusel Matricula:{matricula}</div>
      <div>Más populares</div>
      <div className="w-auto flex m-8">
        <div className="w-1/4">
          {diningRoomData ? (
            <SideMenu
              diningRoom={diningRoomData}
              onSetSelectedCategory={onSetSelectedCategory}
            />
          ) : (
            <span>Cargando datos...</span>
          )}
        </div>
        <div className="w-3/4">
          {selectedCategory ? (
            <ProductList selectedCategory={selectedCategory} />
          ) : (
            // <ProductList />
            <span>No se ha seleccionado una categoría</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
