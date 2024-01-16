import axios, { AxiosError } from "axios"
import { BACKEND_URL, admins } from "../utils/constants"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { User } from "../views/adminView"
import { jwtDecode } from "jwt-decode";
import { Alert } from "@mui/material"
import { useAlert } from "../utils/alert"
import { useState } from "react"

interface IUserProps {
    email : string,
    password : string
}
interface IJwtPayload {
    email : string,
    role : string,
    sub : string
}
interface IErrorData {
    response : object
}
export const useAuth = () => {
    const url = BACKEND_URL + "/Auth"
    const navigate = useNavigate();
    const { errorAlert } = useAlert();
    const queryClient = useQueryClient();
    const userLogin = (user : IUserProps) => { return axios.post(`${url}/login`, user) }
    const [loginFeedback, setLoginFeedback] = useState<any>()
    const userSignIn = (user : object) => {return axios.post(`${url}/register`,user)}

    const { mutate : handleUserLoginMutate } = useMutation(userLogin)
    const { mutate : handleUserSignInMutate } = useMutation(userSignIn)
    
    const handleLogin = (user : IUserProps) => {
        return(
            handleUserLoginMutate(user, {
                onSuccess : (data) => {
                    localStorage.setItem("token",data.data)
                    const decoded = jwtDecode(data.data) as IJwtPayload;
                    localStorage.setItem("email",decoded.email as string)                    
                    {decoded.role == "ClientAdmin" ? navigate('/clientView') : navigate("/adminView")}
                    
                },
                onError : (error ) => setLoginFeedback((error as AxiosError).response?.data)
            })
            
            
        )
    }
    const handleSignIn = (user : object) => {
        return(
            handleUserSignInMutate(user, {
                onSuccess : (data) => {
                    queryClient.invalidateQueries(admins)
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