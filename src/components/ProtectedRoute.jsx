import { getDataLocalStorage, deleteDataLocalStorage } from '../utils/localStorageHelper.js'
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {

    useEffect(() => {
        const token = getDataLocalStorage('token')
        if(!token){
            window.location = '/'
        }
        return () => {
            const saveUser = getDataLocalStorage('save_user')
            if(!saveUser){
                deleteDataLocalStorage('token')
            }
        }
    },[])

    return <Outlet/>;
}

export default ProtectedRoute