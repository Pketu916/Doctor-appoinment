import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setErrorMessage('Password must be at least 8 characters long and include at least one capital letter, one number, and one special character.');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    navigate('/login');
  };

  return (
    <div className='login'>
      <div className="new d-flex align-items-center justify-content-center ">
        <div className="login-form login-form-width">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
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
          </form>
          <p className="mt-3">
            Already have an account<Link to="/login"> Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
