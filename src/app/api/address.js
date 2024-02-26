import axios from 'axios';
import config from '../../config';

export const getAddress = async () => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.get(`${config.apiHost}/api/delivery-addresses?limit=`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.post(`${config.apiHost}/api/delivery-addresses`, data, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

export const getLocationData = async (level, parentId = null) => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  let url = `https://api.goapi.io/regional/provinsi?api_key=40e7b035-5254-576c-9dbd-dc50b129`;

  if (level === 'kabupaten') {
    url = `https://api.goapi.io/regional/kota?api_key=40e7b035-5254-576c-9dbd-dc50b129&provinsi_id=${parentId}`;
  } else if (level === 'kecamatan') {
    url = `https://api.goapi.io/regional/kecamatan?api_key=40e7b035-5254-576c-9dbd-dc50b129&kota_id=${parentId}`;
  } else if (level === 'kelurahan') {
    url = `https://api.goapi.io/regional/kelurahan?api_key=40e7b035-5254-576c-9dbd-dc50b129&kecamatan_id=${parentId}`;
  }

  return await axios.get(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};