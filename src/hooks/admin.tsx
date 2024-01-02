import axios from "axios"
import { BACKEND_URL } from "../utils/constants"

let token = localStorage.getItem("token")

export const useAdmin = () => {
    const url = BACKEND_URL + "/User"
    const handleGetUsers = () => {
        return axios.get(url, {
            headers : {
                'Authorization' : `Bearer ${token}`
            }
        })
    }
    return{
        handleGetUsers
    }
    
}