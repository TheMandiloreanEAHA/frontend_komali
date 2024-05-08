import comedoresImg from "../assets/uv/comedorMinimal.svg";
import cintoIconos from "../assets/uv/cintoIconos.svg";
import { deleteDataLocalStorage } from "../utils/localStorageHelper.js";

const TopBar = ({
  comedorImg = comedoresImg,
  logout = false,
  userName = "",
}) => {
  const deleteSession = () => {
    deleteDataLocalStorage("save_user");
    deleteDataLocalStorage("token");
    window.location = "/";
  };

  const renderShowButton = () => {
    if (logout) {
      return <button onClick={deleteSession}>Cerrar sesión</button>;
    }
  };

  const renderUserName = () => {
    if (userName.length !== "") {
      return <p>{userName}</p>;
    }
  };

  return (
    <div className="flex justify-between p-4">
      <div className="flex flex-row">
        <img
          className="w-7 mr-2"
          src={comedorImg}
          alt="Comedores universitarios"
        />
        <label className="text-xl text-uv-blue font-bold">ADMIN</label>
        {renderUserName()}
      </div>
      <div className="flex flex-row">
        <img
          className="w-24"
          src={cintoIconos}
          alt="Cinco iconos uv"
        />
        {renderShowButton()}
      </div>
    </div>
  );
};

export default TopBar;
