import axios from "axios"
import { BACKEND_URL } from "../utils/constants"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { User } from "../views/adminView"
import { jwtDecode } from "jwt-decode";

interface IUserProps {
    email : string,
    password : string
}
interface IJwtPayload {
    email : string,
    role : string,
    sub : string
  }

export const useAuth = () => {
    const url = BACKEND_URL + "/Auth"
    const navigate = useNavigate();

    const userLogin = (user : IUserProps) => { return axios.post(`${url}/login`, user) }

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
                    console.log(decoded)
                    {decoded.role == "ClientAdmin" ? navigate('/clientView') : navigate("/adminView")}
                    
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