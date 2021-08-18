import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AUTH_TOKEN = 'token';
const MERCHANT_INFO = 'merchantInfo';

const AuthProvider = ({ children }) => {
  const history = useHistory();

  const token = localStorage.getItem(AUTH_TOKEN);
  const merchantInfo = localStorage.getItem(MERCHANT_INFO);

  const [authState, setAuthState] = useState({
    token,
    merchantInfo: merchantInfo ? JSON.parse(merchantInfo) : {}
  });

  const setAuthInfo = ({ token, merchantInfo }) => {
    localStorage.setItem(AUTH_TOKEN, token);
    localStorage.setItem(MERCHANT_INFO, JSON.stringify(merchantInfo));

    setAuthState({
      token,
      merchantInfo
    });
  };


  const logout = () => {
    history.push('/auth/login');
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(MERCHANT_INFO);
    setAuthState({});
  };

  const isAuthenticated = () => {
    if (!authState.token) {
      return false;
    }
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: authInfo => setAuthInfo(authInfo),
        logout,
        isAuthenticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
