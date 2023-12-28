import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"
import ClientTable from "../views/clientView"
import WorkerTable from "../views/workerView"
import { FishFarm } from "../views/fishFarmView"
import { OuterFrame } from "../components/outerFrameComponent"
import { AddFishFarm } from "../views/addFishFarmForm"

export const Allroutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/clientView" element={<ClientTable/>}></Route>
            <Route path="/workerView" element={<WorkerTable/>}></Route>
            <Route path="/fishFarmView" element={<FishFarm/>}></Route>
            <Route path="/outerframe" element={<OuterFrame/>}></Route>
            <Route path="/clientView/addFishfarm" element={<AddFishFarm/>}></Route>
        </Routes>
    )
}