import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Admin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', { username, password });
      const { token } = response.data;

      // Store the token or handle login state
      localStorage.setItem('token', token);
      onLogin(); // Notify App component of successful login
      navigate('/home'); // Redirect to home page
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='login'>
      <div className="new d-flex align-items-center justify-content-center ">
        <div className="login-form login-form-width">
          <h2>Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;