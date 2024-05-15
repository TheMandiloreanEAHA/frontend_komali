import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import SideMenu from "./SideMenu";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";

const Menu = ({
  matricula,
  onChangeMatricula,
  onChangeScaning,
  clientType,
}) => {
  const [diningRoomData, setDiningRoomData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [productInfo, setProductInfo] = useState();

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

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = (product) => {
    setIsModalOpen(true);
    setProductInfo(product);
  };

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
    <div className="relative">
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
            <ProductList
              selectedCategory={selectedCategory}
              openModal={onOpenModal}
            />
          ) : (
            // <ProductList />
            <span>No se ha seleccionado una categoría</span>
          )}
        </div>
      </div>
      {productInfo && isModalOpen && (
        <ProductModal closeModal={onCloseModal} productInfo={productInfo} />
      )}
      <div className="bg-uv-blue fixed bottom-10 right-10 rounded-full size-32 p-8 flex justify-center items-center text-center text-white-100 cursor-pointer">
        <button>Carrito</button>
      </div>
    </div>
  );
};

export default Menu;
