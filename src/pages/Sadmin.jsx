import React from 'react'
import TopBar from '../components/TopBar'
import { useEffect } from 'react'
import { getDataLocalStorage } from '../utils/localStorageHelper'
import { jwtDecode } from 'jwt-decode'

function Sadmin() {

    useEffect(() => {
        const token = getDataLocalStorage('token')
        const data = jwtDecode(token)
        if(data.user_type !== 'second_admin'){
            window.location = '/'
        }
    },[])

    return (
        <>
            <TopBar logout={true}/>
            <div>Sadmin</div>
        </>
    )
}

export default Sadmin