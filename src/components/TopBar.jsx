import comedoresImg from "../assets/uv/comedorMinimal.svg";
import cintoIconos from "../assets/uv/cintoIconos.svg";

const TopBar = ({
  comedorImg = comedoresImg,
  userName = "",
  userType = "",
}) => {
  const renderUserType = () => {
    if (userType !== "") {
      return (
        <label className="text-xl text-uv-blue font-bold uppercase">
          {userType}
        </label>
      );
    }
  };

  const renderUserName = () => {
    if (userName !== "") {
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
        {renderUserType()}
        {renderUserName()}
      </div>
      <div className="flex flex-row">
        <img
          className="w-24"
          src={cintoIconos}
          alt="Cinco iconos uv"
        />
        {/* {renderShowButton()} */}
      </div>
    </div>
  );
};

export default TopBar;
