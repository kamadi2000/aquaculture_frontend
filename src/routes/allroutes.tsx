import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"
import ClientTable from "../views/clientView"
import WorkerTable from "../views/workerView"
import { FishFarm } from "../views/fishFarmView"
import { OuterFrame } from "../components/OuterFrameComponent"
import { ClientInfo } from "../components/ClientInfoComponent"
import { FishfarmForm } from "../views/addFishfarmForm"
import { WorkerForm } from "../views/addWorkerForm"
import { EditWorkerForm } from "../views/editWorkerForm"
import { EditFishfarmForm } from "../views/editFishfarmForm"
import AdminTable from "../views/adminView"
import { AdminForm } from "../views/addAdminForm"

export const Allroutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/clientView" element={<ClientTable/>}></Route>
            <Route path="/workerView/:clientId" element={<WorkerTable/>}></Route>
            <Route path="/fishFarmView" element={<FishFarm/>}></Route>
            <Route path="/adminView" element={<AdminTable/>}></Route>
            <Route path="/outerframe" element={<OuterFrame/>}></Route>
            <Route path="/clientView/:clientId/fishfarm" element={<ClientInfo/>}></Route>
            <Route path="/fishfarmform/:clientId" element={<FishfarmForm/>}></Route>
            <Route path="/:fishfarmId/editFishfarmForm" element={<EditFishfarmForm/>}></Route>
            <Route path="/workerView/:clientId/workerform" element={<WorkerForm/>}></Route>
            <Route path="/workerView/:workerId/editWorkerform" element={<EditWorkerForm/>}></Route>
            <Route path="/adminView/addAdminForm" element={<AdminForm/>}></Route>
        </Routes>
    )
}