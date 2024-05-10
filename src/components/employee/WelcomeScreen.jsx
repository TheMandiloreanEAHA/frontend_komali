import React from 'react'
import click from '../../assets/click.svg'
import logoComedores from '../../assets/uv/logoComedores.svg'
import fondoMascara from '../../assets/uv/fondoMascara.svg'
import background from '../../assets/uv/background.jpg'
import { getDataLocalStorage } from '../../utils/localStorageHelper'
import { jwtDecode } from 'jwt-decode'
import { useState, useEffect } from 'react'
import { axiosGet } from '../../utils/axiosHelper.js'

const WelcomeScreen = () => {

    const [diningRoomData, setDiningRoomData] = useState({})

    useEffect(() => {
        const token = getDataLocalStorage('token')
        const data = jwtDecode(token)
        if(data){
            getDinerRoomData(data.dining_room_id)
        }
    },[])

    const getDinerRoomData = async (dining_room_id) => {
        const token = getDataLocalStorage('token')
        const url = `http://localhost:8000/dining-room/${dining_room_id}`
        const result = await axiosGet(url, token)
        if(result !== undefined){
            setDiningRoomData(result.data)
        }
    }

    const setDiningLogo = () => {
        const diningLogo = diningRoomData.dining_logo
        if(diningLogo === undefined || diningLogo === null){
            return logoComedores
        }else{
            return diningLogo
        }
    }

    const setDiningBanner = () => {
        const diningBg = diningRoomData.dining_bg
        console.log(diningBg)
        if(diningBg === undefined || diningBg === null){
            return background
        }else{
            return diningBg
        }
    }

    const goScanScreen = () => {
        window.location = '/home/store'
    }

    return (
    <>
        <div className='w-full h-full static'>
            <div className="bg-white-100 h-96"></div>
            <div className="bg-white-100 h-96"></div>
            <div className="bg-white-100 h-12"></div>
            <div className="flex justify-center items-center w-full mt-8">
                <div className="w-full relative">
                    <img src={setDiningBanner()} alt="Background de la facultad" className='w-full'/>
                    <div className="mt-6 p-4 text-4xl text-white-100 bg-uv-blue rounded-full absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" onClick={goScanScreen}>
                        <div className='flex flex-row justify-center items-center px-2'>
                            <img src={click} alt="Icono click" className="h-10 fill-white-100 stroke-white-100"/>
                            <span> Toca para comenzar</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute top-12 bg-uv-background bg-cover flex justify-content items-center flex-col pt-36 pb-96 w-full'>
                <p className="text-7xl">Bienvenido a</p>
                <div className="bg-black rounded-full py-4">
                    <img src={setDiningLogo()} alt="Logo comedores" className="w-80 h-80"/>
                </div>
                <p className="text-7xl">Ordena Aquí </p>
            </div>
        </div>
    </>
    )
}

export default WelcomeScreen