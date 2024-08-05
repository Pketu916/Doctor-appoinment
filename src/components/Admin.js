import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'Ketu' && password === '1212') {
      setLoggedIn(true);
      onLogin(); // Notify App component of successful login
      navigate('/home'); // Redirect to home page
    } else {
      alert('Incorrect username or password');
    }
  };

  return (
    <div id='Login' className="new d-flex align-items-center justify-content-center ">
      <div className="login-form p-4">
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
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
