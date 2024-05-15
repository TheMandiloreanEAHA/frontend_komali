import perfilImg from "../assets/perfilFoto.svg";

const InfoCardUser = ({
  userImg = false,
  userName = "",
  diningRoomName = "",
  userType = "",
}) => {
  const renderImg = () => {
    if (userImg) {
    } else {
      //Aquí se debe cargar la foto del usuario
      return (
        <img
          className="flex-none h-24 m-2 mx-6"
          src={perfilImg}
          alt="perfil sin foto"
        />
      );
    }
  };

  const renderUserName = () => {
    if (userName !== "") {
      return (
        <label className="text-3xl font-semibold text-white-500">
          {userName}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-3xl font-semibold text-white-500">
          Nombre de usuario completo
        </label>
      );
    }
  };

  const renderDiningRoomName = () => {
    if (diningRoomName !== "") {
      return (
        <label className="text-lg font-semibold text-white-500">
          {diningRoomName}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-lg font-semibold text-white-500">
          Nombre de la sede
        </label>
      );
    }
  };

  const renderUserType = () => {
    if (userType !== "") {
      return (
        <label className="text-lg font-semibold text-white-500">
          {userType}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-lg font-semibold text-white-500">
          Tipo de usuario
        </label>
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-full h-28 mx-10 bg-uv-blue ">
        {renderImg()}
        <div className="flex-1 flex flex-col justify-center">
          {renderUserName()}
          {renderDiningRoomName()}
          {renderUserType()}
        </div>
      </div>
    </div>
  );
};

export default InfoCardUser;
