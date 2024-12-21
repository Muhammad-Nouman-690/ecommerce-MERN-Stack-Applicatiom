import { Outlet } from "react-router-dom";
import Navbar from "../molecules/Navbar";

export default function Layout () {
    return(
        <>        
        <Navbar/>
        <Outlet/>
        </>
    );
}