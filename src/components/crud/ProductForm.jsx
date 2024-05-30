import { useState, useEffect, useRef } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { axiosGet, axiosPost, axiosPostForm } from "../../utils/axiosHelper";
import { jwtDecode } from "jwt-decode";
import { fileToURL } from "../../utils/imageHelper";
import finger from "../../assets/finger.svg";
import MiniList from "./MiniList";
import { API_URL } from "../../config/config";

const ProductForm = () => {
  const token = getDataLocalStorage("token");
  const data = jwtDecode(token);
  const productValues = {
    product_name: "",
    product_price: null,
    product_student_price: null,
    product_calories: null,
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
  }, []);

  console.log(values);

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
      console.log(result);
    }
  };

  const onAddProduct = async () => {
    const token = getDataLocalStorage("token");
    const url = `${API_URL}products/`;
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
    const result = await axiosPost(url, formatValues, token);
    if (result !== undefined) {
      console.log(result.data);
      addProductImg({
        file: productImgFile,
        product_id: result.data.last_id,
      });
    }
  };

  const onAddOptional = () => {
    setOptionals([...optionals, newOptional]);
  };

  const onAddSelective = () => {
    setSelectives([...selectives, newSelective]);
  };

  return (
    <div className="text-uv-text-black p-8 w-full h-full flex flex-col justify-center items-center">
      <h2 className="w-full text-2xl font-bold">Agregar nuevo producto</h2>
      <div className="w-full flex mt-4">
        <div className="w-1/4 flex flex-col items-center px-4">
          <p className="font-bold mb-2">Imagen del producto</p>
          <div className="bg-gray-100 w-full aspect-square rounded-2xl p-8">
            <img
              src={productImgFile ? fileToURL(productImgFile) : finger}
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
  );
};

export default ProductForm;
