import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { Button, IconButton, Menu, MenuItem, Theme, Tooltip, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

type NavBarProps = {
  open: boolean;
  setOpen: (R: boolean) => void;
  handleDrawerOpen: () => void
}
export const NavBar = ({ open, setOpen, handleDrawerOpen }: NavBarProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  console.log({pathname})
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const drawerWidth = 240;
  interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
    theme?: Theme
  }
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);

  };
  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          disabled = {pathname == "/clientView"}
          color="inherit"
          aria-label="open drawer"
          onClick={() => navigate(-1)}
          edge="start"

        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          Aquaculture
        </Typography>
        <div>
          
          <Tooltip title="Logout" onClick={handleLogout}>
            <IconButton color='inherit'>
              <PermIdentityIcon />
            </IconButton>
          </Tooltip>

        </div>
      </Toolbar>
    </AppBar>
  )
}