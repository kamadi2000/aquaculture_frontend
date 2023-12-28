import axios from "axios"
import { BACKEND_URL } from "../utils/constants"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const url = BACKEND_URL + "/Auth/login"
    const navigate = useNavigate();
    const userLogin = (user : any) => { return axios.post(url, user) }
    const { mutate } = useMutation(userLogin)
    const handleLogin = (user : any) => {
        return(
            mutate(user, {
                onSuccess : (data) => {
                    localStorage.setItem("token",data.data)
                    navigate('/clientView')
                },
                onError : (data) => console.log(data) 
            })
        )
    }
    return {
        handleLogin
    }
}