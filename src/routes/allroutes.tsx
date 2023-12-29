import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"
import ClientTable from "../views/clientView"
import WorkerTable from "../views/workerView"
import { FishFarm } from "../views/fishFarmView"
import { OuterFrame } from "../components/outerFrameComponent"
import { AddFishFarm } from "../views/addFishFarmForm"
import { ClientInfo } from "../components/clientInfoComponent"
import { FishfarmForm } from "../components/addFishfarmFormComponent"
import { WorkerForm } from "../components/addWorkerFormComponent"

export const Allroutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/clientView" element={<ClientTable/>}></Route>
            <Route path="/workerView" element={<WorkerTable/>}></Route>
            <Route path="/fishFarmView" element={<FishFarm/>}></Route>
            <Route path="/outerframe" element={<OuterFrame/>}></Route>
            <Route path="/clientView/:clientId/addFishfarm" element={<AddFishFarm/>}></Route>
            <Route path="/clientView/:clientId/fishfarm" element={<ClientInfo/>}></Route>
            <Route path="/fishFarmView/fishfarmform" element={<FishfarmForm/>}></Route>
            <Route path="/workerView/workerform" element={<WorkerForm/>}></Route>
        </Routes>
    )
}