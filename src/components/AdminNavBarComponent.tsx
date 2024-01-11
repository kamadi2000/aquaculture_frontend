import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FaceIcon from '@mui/icons-material/Face';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function AdminNavBar() {
  const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate("/")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign : 'center'}}>
            Aqua Culture
          </Typography>
          <Tooltip title="Logout" onClick={handleClick}>
            <IconButton color='inherit'>
              <PermIdentityIcon/>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}