import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EXPO_PUBLIC_API_URL } from '@env';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  //This is used to pull registered user who has logged in from the database...
  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        const response = await axios.get(`${EXPO_PUBLIC_API_URL}/user/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        //The state changes by altering the default data on the website...
        setUser(response.data);
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  

  //function to register a user to the database...
  const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/register/`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Registration Error:', error.response.data);
      throw error;
    }
  };


  const login = async (username, password) => {
    try {
      const response = await axios.post(`${EXPO_PUBLIC_API_URL}/login/`, {
        username,
        password
      });
      const { access, refresh } = response.data;
      await AsyncStorage.setItem('access_token', access);
      await AsyncStorage.setItem('refresh_token', refresh);
      const userResponse = await axios.get(`${EXPO_PUBLIC_API_URL}/user/`, {
        headers: { Authorization: `Bearer ${access}` }
      });
      setUser(userResponse.data);
    } catch (error) {
      console.error('Login Error:', error.response.data);
      throw error;
    }
  };

  //logging out of the system...
  const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
