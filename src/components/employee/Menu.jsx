import { useEffect, useState } from 'react'
import { getDataLocalStorage } from '../../utils/localStorageHelper'
import { jwtDecode } from 'jwt-decode'
import { axiosGet } from '../../utils/axiosHelper'
import SideMenu from './SideMenu'

const Menu = ({matricula, onChangeMatricula, onChangeScaning}) => {

    const [diningRoomData, setDiningRoomData] = useState()

    useEffect(() => {
        const initMenu = async () => {
            const token = getDataLocalStorage('token')
            const data = jwtDecode(token)
            if(data){
                await getDinerRoomData(data.dining_room_id)
            }
        }
        initMenu()
    },[])

    const getDinerRoomData = async (dining_room_id) => {
        const token = getDataLocalStorage('token')
        const url = `http://localhost:8000/dining-room/${dining_room_id}`
        const result = await axiosGet(url, token)
        if(result !== undefined){
            setDiningRoomData(result.data)
        }
    }

    return (
        <>
            <div>
                Carrusel
                Matricula:{matricula}
            </div>
            <div>
                Más populares
            </div>    
            <div className='w-full flex'>
                <div className='w-1/3'>
                    {diningRoomData ? (<SideMenu diningRoom={diningRoomData}/>) : (<span>Cargando datos...</span>)}
                </div>
                <div className='w-2/3'>
                    Menu
                </div>
            </div>
        </>
    )
}

export default Menu