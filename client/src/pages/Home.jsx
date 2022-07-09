import { Button } from '@mui/material';
import { useContext } from 'react';
import Video from '../components/Video';

import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../api/user';
import { useAuth } from '../contexts/UserContext';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
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
    <>
      <Video />
      <div className="form_wrap">
        <div className="form_container">
          <div className="form_title">
            <h2>RWH APP</h2>
          </div>
          {!user ? (
            <div className="form_control">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                href="/login"
                margin="normal"
                sx={{ mt: 2, mb: 1 }}
              >
                Login
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                href="/register"
                margin="normal"
                sx={{ mt: 2, mb: 1 }}
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="form_control">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                href="/dashboard"
                margin="normal"
                sx={{ mt: 2, mb: 1 }}
              >
                Dashboard
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                margin="normal"
                onClick={handleLogout}
                sx={{ mt: 2, mb: 1 }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
