import { Route, Routes } from "react-router-dom";
import Portfolio from "../pages/Portfolio";
import Admin from "../pages/Admin";
import Botoes from "../pages/Botoes";

import Login from "../pages/Login";

import Private from "./Private";
import Projetos from "../pages/Projetos";


export default function Router() {
    return(
        <Routes>
            <Route path="/" element={<Portfolio/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/admin" element={<Private><Admin/></Private>}/>
            <Route path="/admin/botoes" element={<Private><Botoes/></Private>}/>
            <Route path="/admin/projeto" element={<Private><Projetos/></Private>}/>
            <Route path="/admin/cursos" element={<Private><Admin/></Private>}/>


            
        </Routes>
    )
}