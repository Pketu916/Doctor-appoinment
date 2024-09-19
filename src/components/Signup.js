import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Validate password strength
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle sign-up form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one capital letter, one number, and one special character.');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // await axios.post('http://localhost:3000/Signup', { username, password });
      // Signup.js

      await axios.post('http://localhost:3000/api/admin/signup', { username, password });

      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='login'>
      <form className="new d-flex align-items-center justify-content-center " onSubmit={handleSignup}>
        <div className="login-form login-form-width">
          <h2>Sign Up</h2>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Repeat Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="showPasswordCheckbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label className="form-check-label" htmlFor="showPasswordCheckbox">
              Show Password
            </label>
          </div>
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary">Sign Up</button>
          <p className="mt-3">
            Already have an account<Link to="/login"> Login Here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
