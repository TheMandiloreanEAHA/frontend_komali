import React from "react";
import TopBar from "../components/TopBar";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getDataLocalStorage } from "../utils/localStorageHelper";
import InfoCardUser from "../components/InfoCardUser";
import AdminOptions from "../components/AdminOptions";
import AdminCrud from "../components/AdminCrud";

function Admin() {
  useEffect(() => {
    const token = getDataLocalStorage("token");
    const data = jwtDecode(token);
    if (data.user_type !== "admin") {
      window.location = "/";
    }
  }, []);

  return (
    <>
      <TopBar logout={true} />
      <InfoCardUser />
      <div className="flex gap-4 mx-10 mt-2">
        <div className="flex-none w-1/5">
          <AdminOptions />
        </div>
        <div className="grow">
          <AdminCrud />
        </div>
      </div>
    </>
  );
}

export default Admin;
