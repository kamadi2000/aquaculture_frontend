import axios from "axios"
import { BACKEND_URL, admins } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query";

export const useAdmin = () => {
    let token = localStorage.getItem("token")
    const queryClient = useQueryClient();
    const url = BACKEND_URL + "/User"

    const deleteUser = (id : number) => {
        return axios.delete(`${url}/${id}`,{
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    const editUser = (user : object) => {
        return axios.put(url, user, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    const { mutate : deleteUserMutate } = useMutation(deleteUser);
    const { mutate : editUserMutate } = useMutation(editUser)
    const handleGetUsers = () => {
        return axios.get(url, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    const handleDelUser = (id : number) => {
        return deleteUserMutate(id, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(admins)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    const handleEditUser = (user : object) => {
        return editUserMutate(user, {
            onSuccess : (data) => {
                queryClient.invalidateQueries(admins)
                console.log(data)},
            onError : (data) => console.log(data)
        })
    }
    const handleGetUserById = (id : number) => {
        return axios.get(`${url}/${id}`, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    return{
        handleGetUsers,
        handleDelUser,
        handleEditUser,
        handleGetUserById
    }
    
}