import { Box, CircularProgress } from "@mui/material"

export const Loading = () => {
    return(
        <Box sx={{display : "flex", alignItems : 'center', justifyContent : 'center',height : '100vh'}}>
        <CircularProgress color="secondary" />
        </Box>
    )
}