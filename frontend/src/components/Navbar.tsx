// components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/file-upload">File Upload</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
