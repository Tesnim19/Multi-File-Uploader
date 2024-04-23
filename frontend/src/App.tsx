import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FileUploadPage from './pages/FileUploadPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/file-upload" element={<FileUploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
