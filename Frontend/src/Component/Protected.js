import { useEffect, useState } from "react";
import { Outlet , Navigate, useNavigate } from "react-router-dom";
import { API } from "../App";
import Cookies from "js-cookie";
import Home from "../pages/Home";

const Protected = () =>{
    const navigate = useNavigate();
    let Auth = {
        token :Cookies.get("fmljwt")
    }

//     const Authotication = async()=>{
//         const result = await API.post( "/Home",{},{ headers: { Authorization: `Bearer ${Auth.token}` } });
//           if (result.data.status === false) {
//             navigate("/");
//           }
//     }
//     useEffect(() => {
// Authotication()
//     }, [])
    

    return(
        Auth.token ? <Navigate to={"/home"}/> : <Outlet/>
    )
}
export default Protected