import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {baseURL} from '../../Dependent/Constants/EndPoints';

console.log('baseURL', baseURL);
const customAxios = axios.create({
  baseURL: 'https://qbrainx.com/qbrainx-web/v1', // Remove curly braces
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});
// Add interceptors if needed
customAxios.interceptors.request.use(
  config => {
    // Modify config if needed (e.g., attach authorization token)
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default customAxios;
