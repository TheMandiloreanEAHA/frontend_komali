import React from 'react'
import TopBar from "../components/TopBar";
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getDataLocalStorage } from '../utils/localStorageHelper';

function Admin() {

    useEffect(() => {
        const token = getDataLocalStorage('token')
        const data = jwtDecode(token)
        if(data.user_type !== 'admin'){
            window.location = '/'
        }
    },[])

    return (
        <>
            <TopBar logout={true}/>
            <div>Admin</div>
        </>
    )
}

export default Admin