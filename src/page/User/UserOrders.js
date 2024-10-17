import React, { useEffect, useState } from 'react';
import { getOrders } from '../../app/api/order';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data.data); // Akses data.data untuk mendapatkan array pesanan
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const calculateTotalAmount = (orderItems, deliveryFee) => {
    const itemsTotal = orderItems.reduce((total, item) => total + item.qty * item.price, 0);
    return itemsTotal + deliveryFee;
  };

  return (
    <div>
      <h3>User Orders</h3>
      {orders.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Delivery Address</th>
              <th>Delivery Fee</th>
              <th>Order Items</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.status}</td>
                <td>
                  {order.delivery_address.detail}, {order.delivery_address.kecamatan}, {order.delivery_address.kabupaten}, {order.delivery_address.provinsi}
                </td>
                <td>Rp.{Number(order.delivery_fee).toLocaleString('ID')}</td>
                <td>
                  <ul>
                    {order.order_items.map(item => (
                      <li key={item._id}>
                        {item.name} - Qty: {item.qty} - Price: Rp.{Number(item.price).toLocaleString('ID')}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>Rp.{Number(calculateTotalAmount(order.order_items, order.delivery_fee)).toLocaleString('ID')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default UserOrders;
