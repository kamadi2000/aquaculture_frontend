import axios from "axios"
import { BACKEND_URL, clients, fishfarms, workers } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"
import { IFishFarmData } from "../components/DialogBoxComponent"


// let email = localStorage.getItem("email")
type FishFormDataProps = {
    id? : number,
    fishFarmData : IFishFarmData
}

export const useClient = () => {
    const url = BACKEND_URL + "/Client"
    const queryClient = useQueryClient();
    let token = localStorage.getItem("token")
    const addClient = (client : object) => { return axios.post(url, client, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    const addClientFishfarm = ({ id, fishFarmData} : FishFormDataProps) => { 
        return axios.put( `${url}/${id}`, fishFarmData,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        }) }
    const deleteClient = (id : number) => { return axios.delete(`${url}/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    const editClient = (client : object) => { return axios.put(url, client, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    const { mutate : addClientMutate } = useMutation(addClient)
    const { mutate : addClientFishfarmMutate } = useMutation(addClientFishfarm)
    const { mutate : deleteClientMutate} = useMutation(deleteClient)
    const { mutate : editClientMutate } = useMutation(editClient) 
    
    const handleAddClient = (client : object) => {
        return addClientMutate(client, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(clients)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }

    const handleGetClient = (email : string|null) => {
        console.log({token})
        return axios.get(`${url}/UserClient/${email}`, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }

    const handleGetClientById = (id : number) => {
        return axios.get(`${url}/${id}`, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }

    const handleClientFishFarm = ({ id, fishFarmData} : FishFormDataProps) => {
        return addClientFishfarmMutate({ id, fishFarmData}, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(fishfarms)
                queryClient.invalidateQueries(workers)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }

    const handleDelClient = (id : number) => {
        return deleteClientMutate(id, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(clients)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    const handleEditClient = (client : object) => {
        return editClientMutate(client, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(clients)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    return {
        handleAddClient,
        handleGetClient,
        handleClientFishFarm,
        handleGetClientById,
        handleDelClient,
        handleEditClient
    }
}