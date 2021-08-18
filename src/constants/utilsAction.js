import axios from 'axios';

export const uploadImage = async (file) => {
 let path = null;

 const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER
 });

 if (process.env.NODE_ENV !== 'production') {
  path = 'aya-zay/merchant';
 } else {
  path = 'test-aya-zay/merchant';
 }

 const signURLRESPONSE = await api.get(`/image/signurl?path=${path}`);
 const response = await axios.put(signURLRESPONSE.data.url, file, {
  headers: { 'Content-Type': 'image/jpeg' },
 });

 console.log("RESPONSE SIGNURL ", signURLRESPONSE.data.key, " ", response.data);

 try {
  return response.status === 200 ? signURLRESPONSE.data.key : null;
 } catch (error) {
  return null;
 }
};

export const urlImage = () => null;

export const Captilize = (string) => string.charAt(0).toUpperCase() + string.slice(1);
