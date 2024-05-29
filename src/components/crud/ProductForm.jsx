import { useState, useEffect } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { axiosGet, axiosPost } from "../../utils/axiosHelper";
import { jwtDecode } from "jwt-decode";

const ProductForm = () => {
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
  const [selectives, setSelectives] = useState([]);
  const [categories, setCategories] = useState([]);

  console.log(values);

  const getCategories = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://localhost:8000/categories/`;
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

  const onAddProduct = async () => {
    const token = getDataLocalStorage("token");
    const url = `http://127.0.0.1:8000/products/`;
    const result = await axiosPost(url, values, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h2>Agregar nuevo producto</h2>
      <input
        type="text"
        value={values.product_name}
        name="product_name"
        placeholder="Nombre"
        onChange={onInputChange}
      />
      <input
        type="number"
        value={values.product_price}
        name="product_price"
        placeholder="Precio"
        onChange={onInputChange}
      />
      <input
        type="number"
        value={values.product_calories}
        name="product_calories"
        placeholder="Calorias"
        onChange={onInputChange}
      />
      <p>Ingredientes opcionales:</p>
      <p>{optionals}</p>
      <p>Variantes:</p>
      <p>{selectives}</p>
      <textarea
        value={values.product_description}
        name="product_description"
        onChange={onInputChange}
      />
      <select
        className="border-2 border-black-900 text-2xl w-9/12 mb-3 cursor-pointer capitalize"
        name="category_id"
        value={values.category_id}
        onChange={onInputChange}
      >
        <option value="" disabled hidden>
          Seleccione una categoria
        </option>
        {categories.length > 0 ? (
          categories.map((item, index) => (
            <option className="capitalize" key={index} value={item.category_id}>
              {item.category_name}
            </option>
          ))
        ) : (
          <option disabled>Cargando Datos...</option>
        )}
      </select>
      <button className="p-4 rounded-full bg-uv-green" onClick={onAddProduct}>
        Agregar
      </button>
    </div>
  );
};

export default ProductForm;
