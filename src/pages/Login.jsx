import { axiosPost } from "../utils/axiosHelper.js";
import { useState, useEffect } from "react";
import logoComedores from "../assets/uv/logoComedores.svg";
import { jwtDecode } from "jwt-decode";
import {
  saveDataLocalStorage,
  getDataLocalStorage,
  deleteDataLocalStorage,
} from "../utils/localStorageHelper.js";
import TopBar from "../components/TopBar.jsx";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");
  const [saveUser, setSaveUser] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Función para redirigir al un ruta dependiendo el tipo de usuario
  const goHome = (userType) => {
    switch (userType) {
      case "admin":
        window.location = "/admin";
        break;
      case "second_admin":
        window.location = "/admin";
        break;
      case "employee":
        window.location = "/employee";
        break;
      default:
        console.log("tipo de usuario inválido");
    }
  };

  //Función para comprobar si el usuario guardo su sesión
  useEffect(() => {
    const token = getDataLocalStorage("token");
    const savedUser = getDataLocalStorage("save_user");
    if (token && savedUser) {
      const data = jwtDecode(token);
      goHome(data.user_type);
    } else {
      deleteDataLocalStorage("token");
      deleteDataLocalStorage("save_user");
    }
  }, []);

  //Función cuando el usuario presiona el botón de iniciar sesión
  async function loginClick() {
    //Nos comunicamos con el backend para comprobar que el usuario sea válido
    const result = await axiosPost("http://localhost:8000/", {
      user_name: userName,
      user_pass: userPass,
    });
    if (result !== undefined) {
      //Si no hubo error vemos si el usuario quiere guardar la sesión y guardamos el token para las próximas peticiones
      if (!result.data.error) {
        if (saveUser) {
          saveDataLocalStorage("save_user", true);
        } else {
          saveDataLocalStorage("save_user", false);
        }
        const token = result.data.token;
        saveDataLocalStorage("token", token);
        if (token) {
          const data = jwtDecode(token);
          goHome(data.user_type);
        }
      } else {
        setErrorMsg("Usuario o contraseña inválido");
      }
    }
  }

  return (
    <>
      <TopBar />
      <div className="relative flex items-center justify-center text-center mt-44">
        <div className="absolute -top-16 w-[8rem] h-[8rem] bg-black rounded-full shadow-[#999] shadow-md">
          <img src={logoComedores} alt="Logo de comedores universitarios uv" />
        </div>
        <div className="rounded-lg flex items-center justify-center text-center shadow-[#999] shadow-inner px-8 py-6">
          <div>
            <br />
            <h1 className="mb-4 mt-8 font-semibold text-lg text-uv-text-black">
              Iniciar sesión
            </h1>
            <p className="text-error">{errorMsg}</p>
            <div className="mb-4">
              <input
                className="bg-gray-100 border-b-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent w-full p-2"
                type="text"
                name="userName"
                placeholder="Usuario"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="bg-gray-100 border-b-2 border-uv-blue text-md focus:outline-none focus:ring-2 focus:ring-uv-blue focus:border-transparent w-full p-2"
                type="password"
                name="userPass"
                placeholder="Contraseña"
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label>
                <input
                  type="checkbox"
                  onClick={() => {
                    setSaveUser(!saveUser);
                  }}
                />{" "}
                Recuérdame
              </label>
            </div>
            <div className="font-semibold text-uv-green mb-6">
              <a href="https://www.uv.mx/">
                ¿Problemas para ingresar? ¡Contactanos!
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="bg-uv-blue rounded-full p-2 text-white-100 font-semibold hover:bg-black py-2 px-12"
                onClick={loginClick}
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
