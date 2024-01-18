// components/Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../app/api/auth';
import { userLogin } from '../../../app/features/Auth/actions';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
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
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
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

            <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
