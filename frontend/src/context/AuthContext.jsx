import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Setup Axios Interceptors
  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const { data } = await api.post('/refresh');
            setToken(data.Access_token || data.token || data.accessToken);
            return api(prevRequest);
          } catch (refreshError) {
            setUser(null);
            setToken(null);
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [token]);

  // Check refresh token on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await api.post('/refresh');
        setToken(data.Access_token || data.token || data.accessToken);
        // We ideally need a user info endpoint, but backend doesn't seem to have one perfectly designed for this.
        // We will mock user object or require login again if we just want token.
        // We'll trust the refresh token initially.
        setUser({ active: true }); 
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    setToken(data.Access_token);
    setUser({ email }); // simplistic user state
  };

  const register = async (name, email, password) => {
    await api.post('/register', { name, email, password });
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch(err) {
      console.error(err);
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
