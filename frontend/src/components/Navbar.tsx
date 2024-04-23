import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/file-upload" className="nav-link">File Upload</Link>
    </nav>
  );
};

export default Navbar;

