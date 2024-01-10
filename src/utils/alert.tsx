import { Alert } from "@mui/material"

export const useAlert = () => {
    const errorAlert = (message : string) => {
        return(
            <Alert severity="error">{message}</Alert>
        )
        
    }
    return{
        errorAlert
    }
}