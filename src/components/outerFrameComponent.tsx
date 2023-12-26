import { Children, useState } from "react"
import { NavBar } from "./navBarComponent"
import SidePanel from "./sidePanelComponent";
import { Box, styled } from "@mui/material";

type OuterFrameProps = {
    children? : any
}

export const OuterFrame = ({children} : OuterFrameProps) => {
    const [open, setOpen] = useState(true);

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }));
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false);
      };
    return(
        <>
        <Box sx={{ display: 'flex' }}>
        <NavBar open={open} setOpen={setOpen} handleDrawerOpen={handleDrawerOpen}></NavBar>
        <SidePanel open={open} setOpen={setOpen} handleDrawerClose={handleDrawerClose}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children} 
      </Box>
        </Box>
        
        </>    
    )
}