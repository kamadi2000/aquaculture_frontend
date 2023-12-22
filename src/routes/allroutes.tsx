import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"

export const Allroutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}></Route>
        </Routes>
    )
}