import AsyncStorage from '@react-native-community/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import customAxios from '../helpers/API';
import axios from 'axios';
export const AuthContext = createContext();
export const AuthProvider = ({children, props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isAppIntro, setAppIntro] = useState(false);

  useEffect(() => {
    showOnBoardScreen();
    isLoggedIn();
  }, [isAppIntro]);
  useEffect(() => {
    isLoggedIn();
  }, []);
  const login = async sendToServer => {
    const requestOptions = {
      method: 'Post',
      redirect: 'follow',
    };

    fetch('https://sabaris.cloudify.store/api/get-settings', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.error(error));

    // The rest of the code remains the same
  };

  const isLoggedIn = async () => {
    try {
      setAuthLoading(true);
      let userData = await AsyncStorage.getItem('userInfo');
      userData = JSON.parse(userData);
      if (userData) {
        setUserInfo(userData);
      }
      setAuthLoading(false);
      // console.log(`is logged in error bases logginf`);
    } catch (e) {
      setAuthLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };
  const showOnBoardScreen = async () => {
    const data = await AsyncStorage.getItem('AppIntro');
    console.log('onBoarding', data);
    if (data !== null) {
      console.log('onBoarding', data);
      setAppIntro(data);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        login,
        isLoading,
        userInfo,
        authLoading,
        isAppIntro,
        setAppIntro,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
