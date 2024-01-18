import { Alert, AlertColor, Snackbar } from "@mui/material"
import { createContext, useContext, useState } from "react"

const NotificationContext = createContext({showNotification : (message : string,severity : AlertColor = "info") => {}})
const { Provider } = NotificationContext

export const NotificationProvider = ({ children }: { children: any }) => {
    const [notificationContent, setNotificationContent] = useState<{message : string|null, severity : AlertColor}>({message : null, severity : 'info'})
    const handleClose = () => {
        setNotificationContent({message : null, severity : 'info'}) 
    }
    const showNotification = (message : string, severity : AlertColor = "info" ) => {
        setNotificationContent({message, severity})
    }
    return (
        <Provider value={{showNotification}}>
            <Snackbar anchorOrigin={{vertical : 'bottom', horizontal : 'left'}} open={!!notificationContent.message} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={notificationContent.severity} sx={{ width: '100%' }}>
                    {notificationContent.message}
                </Alert>
            </Snackbar>
            {children}

        </Provider>
    )
}
export const useNotification = () => {
    const { showNotification } = useContext(NotificationContext)
    return {
        showNotification
    }
}