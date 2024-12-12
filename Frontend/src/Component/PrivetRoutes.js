import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Outlet , Navigate, useNavigate } from "react-router-dom";
import { API } from "../App";

const PrivetRoutes = () =>{
    const navigate = useNavigate();
    let Auth = {
        token :Cookies.get("fmljwt")
    }

//     const Authotication = async()=>{
//         const result = await API.post( "/Home",{},{ headers: { Authorization: `Bearer ${Auth.token}` } });
//           if (result.data.status === false) {
//             navigate("/");
//           }else{
            
//           }
//     }
//     useEffect(() => {
// Authotication()
//     }, [])
    

    return(
        Auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}
export default PrivetRoutes