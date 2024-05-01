import comedorTexto from '../assets/uv/comedorTexto.svg'
import cintoIconos from '../assets/uv/cintoIconos.svg'
import { deleteDataLocalStorage } from '../utils/localStorageHelper.js';

const TopBar = ({comedorImg = comedorTexto, logout = false, userName = ''}) => {

  const deleteSession = () => {
    deleteDataLocalStorage('save_user')
    deleteDataLocalStorage('token')
    window.location = '/'
  }

  const renderShowButton = () => {
    if(logout){
      return (<button onClick={deleteSession}>Cerrar sesión</button>)
    }
  }

  const renderUserName = () => {
    if(userName.length != ''){
      return (<p>{userName}</p>)
    }
  }

  return (
    <div className="flex justify-between p-4">
      <img className="w-24" src={comedorImg} alt="Comedores universitarios"/>
      {renderUserName()}
      <img className="w-24" src={cintoIconos} alt="Cinco iconos uv" />
      {renderShowButton()}
    </div>
  );
};

export default TopBar;
