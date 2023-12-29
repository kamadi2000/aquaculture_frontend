import axios from "axios"
import { BACKEND_URL, workers } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"

let token = localStorage.getItem("token")

export const useWorker = () => {
    const url = BACKEND_URL + "/Worker"
    const queryClient = useQueryClient();

    const addWorker = (worker : object) => { return axios.post(url, worker, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}

    const { mutate : addWorkerMutate } = useMutation(addWorker)
    
    const handleAddWorker = (worker : object) => {
        return addWorkerMutate(worker, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(workers)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }

    const handleGetWorker = () => {
        return axios.get(url, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    return {
        handleAddWorker,
        handleGetWorker
    }
}