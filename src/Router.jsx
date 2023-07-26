import { Route, Routes } from "react-router-dom";
import Portfolio from "./pages/Portfolio";
import Admin from "./pages/Admin";


export default function Router() {
    return(
        <Routes>
            <Route path="/" element={<Portfolio/>}/>
            <Route path="/admin" element={<Admin/>}/>
        </Routes>
    )
}