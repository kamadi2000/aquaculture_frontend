import axios from "axios"
import { BACKEND_URL, workers } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"

let token = localStorage.getItem("token")

export const useWorker = () => {
    const url = BACKEND_URL + "/Worker"
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const addWorker = (worker : object) => { return axios.post(url, worker, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    const deleteWorker = (id : number) => { return axios.delete(`${url}/${id}`,{
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    const editWorker = (worker : object) => { return axios.put(url, worker, {
        headers : {
            'Authorization' : `Bearer ${token}`
        }
    })}
    
    const { mutate : addWorkerMutate } = useMutation(addWorker);
    const { mutate : deleteWorkerMutate } = useMutation(deleteWorker);
    const { mutate : editWorkerMutate } = useMutation(editWorker);
    
    const handleAddWorker = (worker : object) => {
        return addWorkerMutate(worker, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(workers)
                navigate('/workerView')
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

    const handleGetWorkerById = (id : number) => {

        return axios.get(`${url}/${id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }

    const handleDelWorker = (id : number) => {
        return deleteWorkerMutate(id, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(workers)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }

    const handleEditWorker = (worker : object) => {
        return editWorkerMutate(worker, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(workers)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    return {
        handleAddWorker,
        handleGetWorker,
        handleGetWorkerById,
        handleEditWorker,
        handleDelWorker
    }
}