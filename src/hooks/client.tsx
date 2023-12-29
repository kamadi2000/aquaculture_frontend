import axios from "axios"
import { BACKEND_URL, clients } from "../utils/constants"
import { useMutation, useQuery, useQueryClient } from "react-query"

let token = localStorage.getItem("token")

export const useClient = () => {
    const url = BACKEND_URL + "/Client"
    const queryClient = useQueryClient();

    const addClient = (client : object) => { return axios.post(url, client, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}

    const { mutate : addClientMutate } = useMutation(addClient)
    
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
    return {
        handleAddClient,
        handleGetClient
    }
}