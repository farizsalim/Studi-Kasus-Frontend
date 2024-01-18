import axios from 'axios';
import { config } from '../../config';

export const saveCart = async (token, cart) => {
  return await axios.put(`${config.apiHost}/api/carts`, { items: cart }, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};
