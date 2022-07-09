import { useContext, useReducer, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { getUser } from '../api/user';

export const UserContext = createContext({
  user: {},
  isLoading: true,
  dispatch: () => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'FAIL':
      return { user: null, isLoading: false };
    case 'LOADING':
      return { user: null, isLoading: true };
    case 'SUCCESS':
      return { user: action.payload, isLoading: false };
    default:
      throw new Error('Unknown Action');
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    getUser().then((data) => {
      if (data.status === 'ok') {
        return dispatch({ type: 'SUCCESS', payload: data.userId });
      }

      dispatch({ type: 'FAIL' });
    });
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);