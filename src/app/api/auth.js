import axios from "axios";
import config from "../../config";

export const registerUser = async (data) => {
  return await axios.post(`${config.apiHost}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${config.apiHost}/auth/login`, data);
};

export const logoutUser = async () => {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.post(`${config.apiHost}/auth/logout`, null, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then(res => {
    localStorage.removeItem('auth');
    return res;
  });
};
