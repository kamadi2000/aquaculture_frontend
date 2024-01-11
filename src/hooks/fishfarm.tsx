import axios from "axios"
import { BACKEND_URL, clients, fishfarms } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"



export const useFishfarm = () => {
    const url = BACKEND_URL + "/FishFarm"
    let token = localStorage.getItem("token")
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    
    const addFishfarm = (fishfarm : object) => { return axios.post(url, fishfarm, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        }
    })}
    const editFishfarm = (fishfarm : object) => { return axios.put(url, fishfarm, {
        headers : {
            'Authorization' : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        }
    })}
    const deleteFishfarm = (id : number) => { return axios.delete(`${url}/${id}`, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    

    const { mutate : addFarmMutate } = useMutation(addFishfarm)
    const { mutate : editFishfarmMutate } = useMutation(editFishfarm)
    const { mutate : deleteFishfarmMutate } = useMutation(deleteFishfarm)
    
    const handleAddFishfarm = (fishfarm : object) => {
        return addFarmMutate(fishfarm, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(fishfarms)
                console.log(data)
                },
            onError : (data) => console.log(data)
        })
    }

    const handleGetFishfarm = () => {
        return axios.get(url, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    const handleGetByFishfarmId = (id : number) => {
        return axios.get(`${url}/${id}`, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }

    const handleEditFishfarm = (fishfarm : object) => {
        return editFishfarmMutate(fishfarm, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(fishfarms)
                queryClient.invalidateQueries(clients)
                console.log(data)
                },
            onError : (data) => console.log(data)
        })
    }
    const handleDelFishfarm = (id : number) => {
        console.log({id})
        return deleteFishfarmMutate(id, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(fishfarms)
                queryClient.invalidateQueries(clients)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    const handleGetFishFarmWorkers = (fishFarmId : number) => {
        return axios.get(`${url}/clientFishFarms/${fishFarmId}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    
    return {
        handleAddFishfarm,
        handleGetFishfarm,
        handleGetByFishfarmId,
        handleDelFishfarm,
        handleEditFishfarm,
        handleGetFishFarmWorkers
    }
}