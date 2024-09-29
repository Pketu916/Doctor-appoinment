import React, { useState } from 'react';
import './ProfileDropdown.css'; // Ensure you have the CSS for styling
import profilePic from '../img/bg_1.jpg.webp'; // Import the image

const ProfileDropdown = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <div
      className="profile-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profile-icon">
        <img
          src={profilePic}
          alt="Profile"
          className="profile-pic"
        />
      </div>

      {open && (
        <div className="profile-dropdown">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Phone Number:</strong> {user.phone}</p>
          <p><strong>Email ID:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
