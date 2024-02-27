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
    <div className="container mt-4">
      <h2>User Page</h2>
      <nav className="mb-3">
        <button
          className={`btn ${activeContent === 'profile' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveContent('profile')}
        >
          Profile
        </button>
        <button
          className={`btn ${activeContent === 'address' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveContent('address')}
        >
          Address
        </button>
        <button
          className={`btn ${activeContent === 'orders' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveContent('orders')}
        >
          Orders
        </button>
      </nav>

      <div className="card">
        <div className="card-body">
          {user ? (
            renderContent()
          ) : (
            <p className="card-text">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
