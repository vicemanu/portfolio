import { Route, Routes } from "react-router-dom";
import Portfolio from "../pages/Portfolio";
import Admin from "../pages/Admin";
import Login from "../pages/Login";

import Private from "./Private";


export default function Router() {
    return(
        <Routes>
            <Route path="/" element={<Portfolio/>}/>
            <Route path="/admin" element={<Private><Admin/></Private>}/>
            <Route path="/login" element={<Login/>}/>
            
        </Routes>
    )
}