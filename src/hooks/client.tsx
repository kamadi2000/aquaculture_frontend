import axios from "axios"
import { BACKEND_URL, clients } from "../utils/constants"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { IAddFishFarmData } from "../components/stepperComponent"

let token = localStorage.getItem("token")

type FishFormDataProps = {
    id? : string,
    fishFarmData : IAddFishFarmData
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
        return axios.post( `${url}/${id}`, fishFarmData,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        }) }

    const { mutate : addClientMutate } = useMutation(addClient)
    const { mutate : addClientFishfarmMutate } = useMutation(addClientFishfarm)
    
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

    const handleAddFishFarm = ({ id, fishFarmData} : FishFormDataProps) => {
        return addClientFishfarmMutate({ id, fishFarmData}, {
            onSuccess : (data) => console.log(data),
            onError : (data) => console.log(data)
        })
    }
    return {
        handleAddClient,
        handleGetClient,
        handleAddFishFarm
    }
}