import React, { useState, useRef } from "react";

const ComedorForm = () => {
  const [selectedImages, setSelectedImages] = useState([null, null]);
  const [previews, setPreviews] = useState([null, null]);
  const fileImgRefs = [useRef(null), useRef(null)];

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const newSelectedImages = [...selectedImages];
      newSelectedImages[index] = file;
      setSelectedImages(newSelectedImages);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...previews];
        newPreviews[index] = reader.result;
        setPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();
    if (selectedImages.every((image) => image)) {
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append("images", image));
      console.log(formData);
    }
    /*
      try {
        const response = await axios.post("http://localhost:8000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("Imágenes subidas con éxito:", response.data);
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
      }
    }
    */
  };

  return (
    <>
      <div className="my-6">
        <h1 className="text-2xl mb-5">REGISTRO DE UN NUEVO COMEDOR</h1>
        <form
          className="flex flex-col items-center w-full gap-y-4"
          // onSubmit={handleForm}
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 border-black-900 text-2xl w-9/12 mb-3"
            type="text"
            name="name"
            // value={values.name}
            placeholder="Nombre del comedor"
            // onChange={handleInputOnChange}
          />
          <label className="self-start ml-20">
            Selecciona una imagen del comedor (opcional):
          </label>
          <div className="w-full flex justify-between">
            <button
              type="button"
              onClick={() => fileImgRefs[0].current.click()}
              className="w-40 h-12 rounded-full bg-uv-blue text-lg text-white-100 ml-20"
            >
              Agregar imagen
            </button>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(0, event)}
              ref={fileImgRefs[0]}
            />
            {previews[0] && (
              <div className="mb-4">
                <img
                  src={previews[0]}
                  alt="Vista previa"
                  className="w-16 h-w-16 object-cover mr-20"
                />
              </div>
            )}
          </div>
          <label className="self-start ml-20">
            Selecciona un fondo para el inicio del comedor (opcional):
          </label>
          <div className="w-full flex justify-between">
            <button
              type="button"
              onClick={() => fileImgRefs[1].current.click()}
              className="w-40 h-12 rounded-full bg-uv-blue text-lg text-white-100 ml-20"
            >
              Agregar fondo
            </button>
            <input
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(1, event)}
              ref={fileImgRefs[1]}
            />
            {previews[1] && (
              <div className="mb-4">
                <img
                  src={previews[1]}
                  alt="Vista previa"
                  className="w-16 h-w-16 object-cover mr-20"
                />
              </div>
            )}
          </div>
          <select
            className="border-2 border-black-900 text-2xl w-9/12 mb-3  bg-gray-500/70 cursor-not-allowed"
            name="userType"
            disabled={true}
            // value={values.userType}
            // onChange={handleInputOnChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
          <button
            type="submit"
            className="w-52 h-14 rounded-full bg-uv-blue text-2xl text-white-100 hover:font-bold"
          >
            Agregar
          </button>
        </form>
        {/* <ModalAux
          isActive={isActive}
          setisActive={setisActive}
          motivo={motivo}
          initialFormValues={initialFormValues}
          setValues={setValues}
          msj={msj}
          setmsj={setMsj}
        /> */}
      </div>
    </>
  );
};

export default ComedorForm;
