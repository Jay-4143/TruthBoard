import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [businessUser, setBusinessUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load regular user
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo && userInfo !== 'undefined' && userInfo !== 'null') {
        setUser(JSON.parse(userInfo));
      }
    } catch (err) {
      console.error('Failed to parse userInfo:', err);
      localStorage.removeItem('userInfo');
    }

    // Load business account
    try {
      const businessInfo = localStorage.getItem('businessInfo');
      if (businessInfo && businessInfo !== 'undefined' && businessInfo !== 'null') {
        setBusinessUser(JSON.parse(businessInfo));
      }
    } catch (err) {
      console.error('Failed to parse businessInfo:', err);
      localStorage.removeItem('businessInfo');
    }

    setLoading(false);
  }, []);

  // User Auth Actions
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, idToken, extraFields = {}) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { name, email, password, idToken, ...extraFields });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const loginWithPhone = async (idToken) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/phone-login', { idToken });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  // Business Auth Actions
  const loginBusiness = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/business/auth/login', { email, password });
      localStorage.setItem('businessInfo', JSON.stringify(data));
      setBusinessUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const registerBusiness = async (name, email, password, idToken, businessData = {}) => {
    setLoading(true);
    try {
      const { data } = await api.post('/business/auth/register', { name, email, password, idToken, ...businessData });
      localStorage.setItem('businessInfo', JSON.stringify(data));
      setBusinessUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const checkCompanyAvailability = async (companyName, website) => {
    try {
      await api.post('/business/auth/check-company', { companyName, website });
      return true;
    } catch (err) {
      throw err.response?.data?.message || 'Company already registered';
    }
  };

  const logoutBusiness = () => {
    localStorage.removeItem('businessInfo');
    setBusinessUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, businessUser, loading,
      login, register, loginWithPhone, logout,
      loginBusiness, registerBusiness, logoutBusiness,
      checkCompanyAvailability
    }}>
      {children}
    </AuthContext.Provider>
  );
};
