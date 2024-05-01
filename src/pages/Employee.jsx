import React from 'react'
import TopBar from '../components/TopBar'
import { useEffect } from 'react'
import { getDataLocalStorage } from '../utils/localStorageHelper'
import { jwtDecode } from 'jwt-decode'

function Employee() {

    useEffect(() => {
        const token = getDataLocalStorage('token')
        const data = jwtDecode(token)
        if(data.user_type !== 'employee'){
            window.location = '/'
        }
    },[])

    return (
        <>
            <TopBar logout={true}/>
            <div>Employee</div>
        </>
    )
}

export default Employee