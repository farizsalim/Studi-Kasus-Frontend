// components/Login.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../app/api/auth';
import { userLogin } from '../../../app/features/Auth/actions';
import Swal from 'sweetalert2';
import './index.css';
import '../../spinner.css'; // Import the spinner CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for the initial load
  const [loginLoading, setLoginLoading] = useState(false); // Loading state for the login process
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Simulate loading for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleLogin = async () => {
    setLoginLoading(true); // Set login loading to true
    try {
      const response = await loginUser({ email, password });
      const { data } = response;

      if (data.error && data.message === 'Email or Password incorrect') {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Email or Password incorrect',
        });
      } else {
        dispatch(userLogin({ user: data.user, token: data.token }));
        localStorage.setItem('auth', JSON.stringify(data));

        // Display a success message using SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
        });

        // Navigate to the home page
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'An error occurred during login.',
        });
      }
    } finally {
      setLoginLoading(false); // Reset login loading state
    }
  };

  if (loading || loginLoading) {
    return (
      <div className="spinner-container">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
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

          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
