import { Route, Routes } from "react-router-dom"
import { Login } from "../views/loginView"
import ClientTable from "../views/clientView"
import WorkerTable from "../views/workerView"
import { OuterFrame } from "../components/OuterFrameComponent"
import { ClientInfo } from "../components/ClientInfoComponent"
import { FishfarmForm } from "../views/addFishfarmForm"
import { WorkerForm } from "../views/addWorkerForm"
import { EditWorkerForm } from "../views/editWorkerForm"
import { EditFishfarmForm } from "../views/editFishfarmForm"
import AdminTable from "../views/adminView"
import { AdminForm } from "../views/addAdminForm"
import { Loading } from "../components/LoadingComponent"

export const Allroutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/clientView" element={<ClientTable/>}></Route>
            <Route path="/workerView/:clientId" element={<WorkerTable/>}></Route>
            <Route path="/adminView" element={<AdminTable/>}></Route>
            <Route path="/outerframe" element={<OuterFrame/>}></Route>
            <Route path="/clientView/:clientId/fishfarm" element={<ClientInfo/>}></Route>
        </Routes>
    )
}