// components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../app/api/auth';
import Swal from 'sweetalert2';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password, full_name: fullName });
      const { data } = response;
  
      if (data.error && data.message) {
        // Handle registration failure with SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: data.message,
        });
      } else {
        // Display a success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Welcome! You have been registered successfully.',
        });
  
        // Navigate to the home page or another appropriate route
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
  
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;
  
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'An error occurred during registration.',
        });
      }
    }
  };
  
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Register</h2>
          <form>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Full Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={handleRegister}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
