import axios from "axios";
import config  from "../../config";

export const createOrder = async (payload) => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.post(`${config.apiHost}/api/orders`, payload, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

export async function getInvoiceByOrderId(order_id) {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.get(`${config.apiHost}/api/invoices/${order_id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export async function getOrders() {
  let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  return await axios.get(`${config.apiHost}/api/orders?limit=`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}
