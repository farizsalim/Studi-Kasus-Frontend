import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../app/api/auth';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle logout error, show message or redirect to error page
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
