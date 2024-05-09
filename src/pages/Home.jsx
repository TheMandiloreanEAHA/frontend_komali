import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useEffect, useState } from "react";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import { jwtDecode } from "jwt-decode";

export default function Home() {

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
      <Outlet/>
    </>
  );
}
