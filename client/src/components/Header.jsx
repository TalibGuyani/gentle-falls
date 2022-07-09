import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../api/user';
import { useAuth } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const {  dispatch } = useAuth();

  const handleLogout =  (e) => {
    e.preventDefault();
    
    logout().then((res) => {
      dispatch({ type: 'FAIL' });
      toast.success(res.message);
      navigate('/', { replace: true });
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link className="logo" to="/">RWH APP</Link>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
