import axios from "axios"
import { BACKEND_URL } from "../utils/constants"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { User } from "../views/adminView"

export const useAuth = () => {
    const url = BACKEND_URL + "/Auth"
    const navigate = useNavigate();

    const userLogin = (user : any) => { return axios.post(`${url}/login`, user) }

    const userSignIn = (user : object) => {return axios.post(`${url}/register`,user)}

    const { mutate : handleUserLoginMutate } = useMutation(userLogin)
    const { mutate : handleUserSignInMutate } = useMutation(userSignIn)

    const handleLogin = (user : any) => {
        return(
            handleUserLoginMutate(user, {
                onSuccess : (data) => {
                    localStorage.setItem("token",data.data)
                    navigate('/clientView')
                },
                onError : (data) => console.log(data) 
            })
        )
    }
    const handleSignIn = (user : object) => {
        return(
            handleUserSignInMutate(user, {
                onSuccess : (data) => {
                    localStorage.setItem("token",data.data)
                    navigate('/adminView')
                },
                onError : (data) => console.log(data) 
            })
        )
    }
    
    return {
        handleLogin,
        handleSignIn
    }
}