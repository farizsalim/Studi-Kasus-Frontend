import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import UserOrders from './UserOrders';
import UserAddress from './UserAddress';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState(null);
  const [activeContent, setActiveContent] = useState('profile');

  useEffect(() => {
    // Ambil data pengguna dari localStorage
    const storedUserData = JSON.parse(localStorage.getItem('auth'));

    // Pastikan ada data pengguna yang tersimpan dan user tidak null
    if (storedUserData && storedUserData.user) {
      setUser(storedUserData.user);
      setOrders(storedUserData.orders || []);
      setAddress(storedUserData.address || null);
    }
  }, []);

  const renderContent = () => {
    switch (activeContent) {
      case 'profile':
        return <UserProfile user={user} />;
      case 'orders':
        return <UserOrders orders={orders} />;
      case 'address':
        return <UserAddress address={address} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>User Page</h2>
      <nav>
        <button onClick={() => setActiveContent('profile')}>Profile</button>
        <button onClick={() => setActiveContent('address')}>Address</button>
        <button onClick={() => setActiveContent('orders')}>Orders</button>
      </nav>

      {user ? (
        renderContent()
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserPage;