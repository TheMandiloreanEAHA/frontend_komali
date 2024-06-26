import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";
import { axiosGet } from "../../utils/axiosHelper";
import SideMenu from "./SideMenu";
import ProductList from "./ProductList";
import ProductModal from "./ProductModal";
import shoppingCarIcon from "../../assets/shoppingCarIcon.svg";
import TemporalModal from "../TemporalModal";
import { API_URL } from "../../config/config";

const Menu = () => {
  const [diningRoomData, setDiningRoomData] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productInfo, setProductInfo] = useState();
  const [countProducts, setCountProducts] = useState(0);
  const [matricula, setMatricula] = useState();
  const [clienteType, setClientType] = useState();
  const [temporalModal, setTemporalModal] = useState(false);
  const [visibleShoppingCart, setVisibleShoppingCart] = useState(true);

  const getCurrentOrder = () => {
    let currentOrder = getDataLocalStorage("order");
    if (currentOrder) {
      setCountProducts(currentOrder.length);
    }
  };

  useEffect(() => {
    const initMenu = async () => {
      const token = getDataLocalStorage("token");
      setMatricula(getDataLocalStorage("matricula"));
      setClientType(getDataLocalStorage("client_type"));
      const data = jwtDecode(token);
      if (data) {
        await getDinerRoomData(data.dining_room_id);
      }
      getCurrentOrder();
    };
    initMenu();
  }, []);

  const onCloseModal = () => {
    setIsModalOpen(false);
    getCurrentOrder();
  };

  const onOpenModal = (product) => {
    setIsModalOpen(true);
    setProductInfo(product);
  };

  const onOpenTemporalModal = () => {
    setTemporalModal(true);
  };

  const onSetSelectedCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const goShoppingCart = () => {
    window.location = "/home/cart";
  };

  const getDinerRoomData = async (dining_room_id) => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}dining-room/${dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setDiningRoomData(result.data);
    }
  };

  return (
    <div className="h-full">
      <div className="w-full flex px-6 pb-6 h-screen">
        <div className="w-1/6 h-full mr-6">
          {diningRoomData ? (
            <SideMenu
              diningRoom={diningRoomData}
              onSetSelectedCategory={onSetSelectedCategory}
            />
          ) : (
            <span>Cargando datos...</span>
          )}
        </div>
        <div className="w-5/6 h-full">
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
      {/* MODALES */}
      {productInfo && isModalOpen && (
        <ProductModal
          closeModal={onCloseModal}
          productInfo={productInfo}
          openTemporalModal={onOpenTemporalModal}
          setVisibleShoppingCart={setVisibleShoppingCart}
        />
      )}
      {temporalModal && (
        <TemporalModal
          setTemporalModal={setTemporalModal}
          message="Producto agregado al carrito"
        />
      )}
      {visibleShoppingCart && (
        <div
          className="bg-uv-blue fixed bottom-10 right-10 rounded-full size-32 flex justify-center items-center text-center text-white-100 cursor-pointer"
          onClick={goShoppingCart}
        >
          <div className="static">
            <div className="bg-uv-blue rounded-full size-14 absolute -top-3 -right-3 flex justify-center items-center text-2xl font-bold">
              {countProducts}
            </div>
            <img
              className="w-full h-full"
              src={shoppingCarIcon}
              alt="Carrito"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
