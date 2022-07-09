import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/UserContext';

const Protected = ({ children }) => {
  const navigate = useNavigate();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <h2 class="wait">Please wait</h2>;
  }

  if (!user) {
    return null;
  }

  return children;
};

export default Protected;
