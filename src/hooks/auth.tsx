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
                    localStorage.setItem("email",user.email)
                    const decoded = jwtDecode(data.data);
                    console.log(decoded)
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