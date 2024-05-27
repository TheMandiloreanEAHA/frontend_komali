import perfilImg from "../assets/perfilFoto.svg";

const InfoCardUser = ({
  userImg = false,
  userName,
  diningRoomName,
  userType,
}) => {
  const renderImg = () => {
    if (userImg) {
    } else {
      //Aquí se debe cargar la foto del usuario
      return (
        <img
          className="h-20 aspect-square"
          src={perfilImg}
          alt="perfil sin foto"
        />
      );
    }
  };

  const renderUserName = () => {
    if (userName !== "") {
      return (
        <label className="text-2xl font-semibold text-white-500 capitalize">
          {userName}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-2xl font-semibold text-white-500">
          Nombre de usuario completo
        </label>
      );
    }
  };

  const renderDiningRoomName = () => {
    if (diningRoomName !== "") {
      return (
        <label className="text-md font-semibold text-white-500 uppercase">
          {diningRoomName}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-md font-semibold text-white-500">
          Nombre de la sede
        </label>
      );
    }
  };

  const renderUserType = () => {
    if (userType !== "") {
      return (
        <label className="text-md font-semibold text-white-500 capitalize">
          {userType}
        </label>
      );
    } else {
      //Aquí va el texto por default
      return (
        <label className="text-md font-semibold text-white-500">
          Tipo de usuario
        </label>
      );
    }
  };

  return (
    <div className="flex w-full h-auto bg-uv-blue justify-start items-center px-8 py-2">
      <div className="mr-4">{renderImg()}</div>
      <div className="flex flex-col justify-center">
        {renderUserName()}
        {renderDiningRoomName()}
        {renderUserType()}
      </div>
    </div>
  );
};

export default InfoCardUser;
