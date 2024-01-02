import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"
import ClientTable from "../views/clientView"
import WorkerTable from "../views/workerView"
import { FishFarm } from "../views/fishFarmView"
import { OuterFrame } from "../components/outerFrameComponent"
import { AddFishFarm } from "../views/addClientFishFarm"
import { ClientInfo } from "../components/clientInfoComponent"
import { FishfarmForm } from "../views/addFishfarmForm"
import { WorkerForm } from "../views/addWorkerForm"
import { EditWorkerForm } from "../views/editWorkerForm"
import { EditFishfarmForm } from "../views/editFishfarmForm"

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
            <Route path="/fishFarmView/:fishfarmId/editFishfarmForm" element={<EditFishfarmForm/>}></Route>
            <Route path="/workerView/workerform" element={<WorkerForm/>}></Route>
            <Route path="/workerView/:workerId/editWorkerform" element={<EditWorkerForm/>}></Route>
        </Routes>
    )
}