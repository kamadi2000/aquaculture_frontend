import axios from "axios"
import { BACKEND_URL, clients } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"
import { IFishFarmData } from "../components/DialogBoxComponent"

let token = localStorage.getItem("token")

type FishFormDataProps = {
    id? : number,
    fishFarmData : IFishFarmData
}

export const useClient = () => {
    const url = BACKEND_URL + "/Client"
    const queryClient = useQueryClient();

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

    const { mutate : addClientMutate } = useMutation(addClient)
    const { mutate : addClientFishfarmMutate } = useMutation(addClientFishfarm)
    const { mutate : deleteClientMutate} = useMutation(deleteClient)
    
    const handleAddClient = (client : object) => {
        return addClientMutate(client, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(clients)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }

    const handleGetClient = () => {
        return axios.get(url, {
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
            onSuccess : (data) => console.log(data),
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
    return {
        handleAddClient,
        handleGetClient,
        handleClientFishFarm,
        handleGetClientById,
        handleDelClient
    }
}