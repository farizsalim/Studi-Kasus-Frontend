// components/Register.js
import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { registerUser } from '../../../app/api/auth';
import Swal from 'sweetalert2';
import './index.css';
import '../../spinner.css'; // Import the spinner CSS

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for the initial load
  const [registerLoading, setRegisterLoading] = useState(false); // Loading state for the registration process
  const navigate = useNavigate();

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleRegister = async () => {
    setRegisterLoading(true); // Set register loading to true
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

        // Navigate to the login page
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
    } finally {
      setRegisterLoading(false); // Reset register loading state
    }
  };

  if (loading || registerLoading) {
    return (
      <div className="spinner-container">
        <div className="lds-dual-ring"></div> {/* Spinner element */}
      </div>
    );
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Register</h2>
        <form>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Full Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <button type="button" className="register-button" onClick={handleRegister}>
            Register
          </button>
          <div className="signin-link">
            <p>Already have an account? <Link to="/login">Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
