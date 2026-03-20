import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    setLoading(false);
    return data;
  };

  const register = async (name, email, password, idToken, extraFields = {}) => {
    setLoading(true);
    const { data } = await api.post('/auth/register', { name, email, password, idToken, ...extraFields });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
    setLoading(false);
    return data;
  };

  const loginWithPhone = async (idToken) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/phone-login', { idToken });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const updateUser = (data) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const updatedInfo = { ...userInfo, ...data };
    localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
    setUser(updatedInfo);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithPhone, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
