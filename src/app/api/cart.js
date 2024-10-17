import axios from 'axios';
import config  from '../../config';

export const saveCart = async (token, cart) => {
  try {
    return await axios.put(`${config.apiHost}/api/carts`, { items: cart }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error saving cart:', error);
    throw error; // Melempar ulang error agar bisa ditangani di tempat lain
  }
};

