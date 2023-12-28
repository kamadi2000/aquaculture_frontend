import axios from "axios"
import { BACKEND_URL, fishfarms } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"

let token = localStorage.getItem("token")

export const useFishfarm = () => {
    const url = BACKEND_URL + "/FishFarm"
    const queryClient = useQueryClient();
    
    const addFishfarm = (fishfarm : object) => { return axios.post(url, fishfarm, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}

    const { mutate : ADDCLIENT } = useMutation(addFishfarm)
    
    const handleAddFishfarm = (fishfarm : object) => {
        return ADDCLIENT(fishfarm, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(fishfarms)
                console.log(data)},
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
    return {
        handleAddFishfarm,
        handleGetFishfarm
    }
}