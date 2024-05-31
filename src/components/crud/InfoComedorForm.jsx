import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useRef } from "react";
import { getDataLocalStorage } from "../../utils/localStorageHelper";
import { axiosGet, axiosPutForm } from "../../utils/axiosHelper";
import { API_URL } from "../../config/config";
import { base64ToFile, fileToURL } from "../../utils/imageHelper";

const InfoComedorForm = () => {
  const [diningLogo, setDiningLogo] = useState();
  const [diningBg, setDiningBg] = useState();
  const bgRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    getDiningRoom();
  }, []);

  const getDiningRoom = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const url = `${API_URL}dining-room/${data.dining_room_id}`;
    const result = await axiosGet(url, token);
    if (result !== undefined) {
      const data = result.data;
      setDiningLogo(base64ToFile(data.dining_logo));
      setDiningBg(base64ToFile(data.dining_bg));
    }
  };

  const onSetBg = (e) => {
    setDiningBg(e.target.files[0]);
  };

  const onSetLogo = (e) => {
    setDiningLogo(e.target.files[0]);
  };

  const onUpdateDining = async () => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    const url = `${API_URL}dining-room/`;
    const request = {
      dining_id: data.dining_room_id,
      logo_file: diningLogo,
      bg_file: diningBg,
    };
    const result = await axiosPutForm(url, request, token);
    if (result !== undefined) {
      console.log(result);
    }
  };

  return (
    <>
      <div className="rounded-3xl w-full h-full p-6 bg-white-100">
        <div className="grid grid-cols-2 gap-8 text-xl font-bold text-uv-text-black text-center">
          <div>
            <p>Imagen de fondo del comedor</p>
          </div>
          <div>
            <p>Logo del comedor</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 p-4">
          <div className="flex justify-center items-center bg-gray-100 rounded-2xl">
            <img className="h-80" src={fileToURL(diningBg)} alt="Fondo" />
          </div>
          <div className="flex justify-center items-center bg-gray-100 rounded-2xl">
            <img className="h-80" src={fileToURL(diningLogo)} alt="Logo" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <button
              className="bg-uv-blue text-white-100 rounded-full p-2 w-full font-bold mt-2"
              onClick={() => bgRef.current.click()}
            >
              Seleccionar imagen
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={bgRef}
              onChange={onSetBg}
            />
          </div>
          <div>
            <button
              className="bg-uv-blue text-white-100 rounded-full p-2 w-full font-bold mt-2"
              onClick={() => logoRef.current.click()}
            >
              Seleccionar logo
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={logoRef}
              onChange={onSetLogo}
            />
          </div>
        </div>
        <div className="w-full">
          <button
            className="bg-uv-green text-white-100 font-bold text-lg rounded-full px-8 py-2"
            onClick={onUpdateDining}
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoComedorForm;
