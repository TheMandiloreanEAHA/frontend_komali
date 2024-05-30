import { useState, useEffect, useRef, useContext } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import {
  axiosGet,
  axiosPost,
  axiosPostForm,
  axiosPut,
} from "../../utils/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { base64ToFile, fileToURL } from "../../utils/imageHelper";
import cameraIcon from "../../assets/cameraIcon.svg";
import MiniList from "./MiniList";
import { API_URL } from "../../config/config";
import { crudContext } from "../../pages/Admin";
import { getProducts } from "../../utils/requestHelper";

const ProductForm = ({ isEdit = false }) => {
  const { row, modal, list } = useContext(crudContext);
  const [selectedRow, setSelectedRow] = row;
  const [isModalOpen, setIsModalOpen] = modal;
  const [dataList, setDataList] = list;
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const productValues = {
    product_name: "",
    product_price: 0,
    product_student_price: 0,
    product_calories: 0,
    product_optionals: [],
    product_selectives: [],
    product_description: "",
    category_id: 1,
    dining_id: data.dining_room_id,
  };

  const [values, setValues] = useState(productValues);
  const [optionals, setOptionals] = useState([]);
  const [newOptional, setNewOptional] = useState("");
  const [selectives, setSelectives] = useState([]);
  const [newSelective, setNewSelective] = useState("");
  const [productImgFile, setProductImgFile] = useState();
  const [categories, setCategories] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    getCategories();
    if (isEdit) {
      getValuesById();
    }
  }, []);

  const getValuesById = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const url = `${API_URL}products/getbyid/${data.dining_room_id}/${selectedRow}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      const data = result.data;
      console.log(data);
      const productValuesAux = {
        product_name: data.product_name,
        product_price: data.product_price,
        product_student_price: 0,
        product_calories: data.product_calories,
        product_optionals: [],
        product_selectives: [],
        product_description: data.product_description,
        category_id: data.category_id,
        dining_id: data.dining_room_id,
      };
      setValues(productValuesAux);
      if (data.product_optionals) {
        setOptionals(data.product_optionals);
      }
      if (data.product_selectives) {
        setSelectives(data.product_selectives);
      }
      if (data.product_img) {
        setProductImgFile(base64ToFile(data.product_img));
      }
    }
  };

  const onSetProductImg = (e) => {
    setProductImgFile(e.target.files[0]);
  };

  const getCategories = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}categories/`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      setCategories(result.data);
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const addProductImg = async (formData) => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}products/image`;
    const result = await axiosPostForm(url, formData, token);
    if (result !== undefined) {
      return result;
    }
  };

  const onAddProduct = async () => {
    const token = getDataLocalStorage("token");
    const formatValues = {
      product_name: values.product_name,
      product_price: parseFloat(values.product_price),
      product_student_price: 0,
      product_calories: parseInt(values.product_calories),
      product_optionals: optionals,
      product_selectives: selectives,
      product_description: values.product_description,
      category_id: values.category_id,
      dining_id: values.dining_id,
    };
    if (!isEdit) {
      const url = `${API_URL}products/`;
      const result = await axiosPost(url, formatValues, token);
      if (result !== undefined && result.status === 200) {
        const imgResult = await addProductImg({
          file: productImgFile,
          product_id: result.data.last_id,
        });
        if (imgResult !== undefined && result.status === 200) {
          // ACTIVAR MODAL
          console.log("PRODUCTO AGREGADO CORRECTAMENTE");
          setIsModalOpen(false);
          setDataList(await getProducts());
        }
      }
    } else {
      const url = `${API_URL}products/`;
      formatValues["product_id"] = selectedRow;
      formatValues["is_active"] = true;
      const result = await axiosPut(url, formatValues, token);
      if (result !== undefined && result.status === 200) {
        const imgResult = await addProductImg({
          file: productImgFile,
          product_id: selectedRow,
        });
        if (imgResult !== undefined && result.status === 200) {
          // ACTIVAR MODAL
          console.log("PRODUCTO ACTUALIZADO CORRECTAMENTE");
          setIsModalOpen(false);
          setDataList(await getProducts());
        }
      }
    }
  };

  const onAddOptional = () => {
    setOptionals([...optionals, newOptional]);
  };

  const onAddSelective = () => {
    setSelectives([...selectives, newSelective]);
  };

  return (
    <>
      <div className="w-full h-svh overflow-y-auto">
        <div className="text-uv-text-black p-8 flex flex-col justify-center items-center">
          <h2 className="w-full text-2xl font-bold">Agregar nuevo producto</h2>
          <div className="w-full flex mt-4">
            <div className="w-1/4 flex flex-col items-center px-4">
              <p className="font-bold mb-2">Imagen del producto</p>
              <div className="bg-gray-100 w-32 aspect-square rounded-2xl p-8 flex justify-center items-center">
                <img
                  src={productImgFile ? fileToURL(productImgFile) : cameraIcon}
                  alt="Imagen del producto"
                />
              </div>
              <button
                className="bg-uv-blue text-white-100 rounded-full p-2 w-full font-bold mt-2"
                onClick={() => imgRef.current.click()}
              >
                Seleccionar imagen
              </button>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={imgRef}
                onChange={onSetProductImg}
              />
            </div>
            <div className="w-3/4">
              <div className="w-full">
                <input
                  className="w-full border h-10 border-gray-300 rounded-lg p-2"
                  type="text"
                  value={values.product_name}
                  name="product_name"
                  placeholder="Nombre del producto"
                  onChange={onInputChange}
                />
              </div>
              <div className="w-full grid grid-cols-2 gap-4 my-4">
                <input
                  className="border h-10 border-gray-300 rounded-lg p-2"
                  type="number"
                  value={values.product_price}
                  name="product_price"
                  placeholder="Precio"
                  onChange={onInputChange}
                />
                <input
                  className="border h-10 border-gray-300 rounded-lg p-2"
                  type="number"
                  value={values.product_calories}
                  name="product_calories"
                  placeholder="Calorias"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <textarea
                  className="w-full h-32 border border-gray-300 rounded-lg p-2"
                  value={values.product_description}
                  name="product_description"
                  placeholder="Descripción del producto"
                  onChange={onInputChange}
                />
              </div>
              <div className="w-full flex mt-2">
                <div className="w-1/4 m-auto font-bold">Categoría:</div>
                <div className="w-3/4">
                  <select
                    className="border border-gray-300 text-lg p-2 rounded-lg w-full cursor-pointer capitalize"
                    name="category_id"
                    value={values.category_id}
                    onChange={onInputChange}
                  >
                    {categories.length > 0 ? (
                      categories.map((item, index) => (
                        <option
                          className="capitalize"
                          key={index}
                          value={item.category_id}
                        >
                          {item.category_name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Cargando Datos...</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-2 gap-4 my-4">
            <div>
              <p className="font-bold">Ingredientes opcionales:</p>
              <MiniList list={optionals} setList={setOptionals} />
              <input
                className="w-full border h-10 border-gray-300 rounded-lg p-2"
                type="text"
                name="optionals"
                placeholder="Ingrediente opcional"
                value={newOptional}
                onChange={(e) => {
                  setNewOptional(e.target.value);
                }}
              />
              <button
                className="bg-uv-blue text-white-100 rounded-full p-2 w-1/2 font-bold mt-2"
                onClick={onAddOptional}
              >
                Agregar opcional
              </button>
            </div>
            <div>
              <p className="font-bold">Variantes:</p>
              <MiniList list={selectives} setList={setSelectives} />
              <input
                className="w-full border h-10 border-gray-300 rounded-lg p-2"
                type="text"
                placeholder="Variante"
                value={newSelective}
                onChange={(e) => {
                  setNewSelective(e.target.value);
                }}
              />
              <button
                className="bg-uv-blue text-white-100 rounded-full p-2 w-1/2 font-bold mt-2"
                onClick={onAddSelective}
              >
                Agregar variante
              </button>
            </div>
          </div>
          <button
            className="text-lg font-bold text-white-100 p-4 rounded-full bg-uv-green w-52"
            onClick={onAddProduct}
          >
            Finalizar
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductForm;
