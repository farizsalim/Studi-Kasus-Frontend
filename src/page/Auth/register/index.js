import React, { useState } from 'react';
import { registerUser } from '../../../app/api/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await registerUser({ email, password, fullName });
      const { data } = response;
      localStorage.setItem('auth', JSON.stringify(data));

      // Menggunakan window.location untuk melakukan navigasi
      window.location.href = '/'; // Ganti dengan rute yang sesuai
    } catch (error) {
      console.error('Error during registration:', error);
      // Handle registration error, show message or redirect to error page
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label>Full Name:</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
