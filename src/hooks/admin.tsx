import axios from "axios"
import { BACKEND_URL } from "../utils/constants"

export const useAdmin = () => {
    let token = localStorage.getItem("token")
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