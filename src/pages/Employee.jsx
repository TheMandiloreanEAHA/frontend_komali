import React from 'react'
import { useEffect } from 'react'
import { getDataLocalStorage } from '../utils/localStorageHelper'
import { jwtDecode } from 'jwt-decode'
import TopBar from '../components/TopBar'

const Employee = () => {

    const changeScreen = (pantalla) => {
        switch(pantalla){
            case 'order':
                window.location = '/order'
                break;
            case 'home':
                window.location = '/home'
                break;
            default:
                console.log('Pantalla inválida')
        }
    }

    useEffect(() => {
        const token = getDataLocalStorage('token')
        const data = jwtDecode(token)
        if(data.user_type !== 'employee'){
            window.location = '/'
        }
    },[])

    return (
        <>
            <TopBar/>
            <button onClick={() => {changeScreen('order')}}>Ordenes</button>
            <button onClick={() => {changeScreen('home')}}>Tienda</button>
        </>
    )
}

export default Employee;