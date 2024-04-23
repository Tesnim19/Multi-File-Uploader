import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FileEditModal from '../components/FileEditModal'; // Import FileEditModal component
import '../styles/styles.css'; 

const HomePage: React.FC = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [editFile, setEditFile] = useState<any>(null); // State to store the file being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage the visibility of the modal

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files');
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/files/${id}`);
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleEdit = (file: any) => {
    setEditFile(file);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpdated = () => {
    setIsModalOpen(false);
    fetchFiles();
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1>My File Uploader</h1>
      </div>
      {files.length === 0 ? (
        <div className="upload-button">
          <h2>No files uploaded</h2>
          <Link to="/upload">
            <button>Upload File</button>
          </Link>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Filename</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td>{file.filename}</td>
                  <td>
                    <a href={`http://localhost:3000/api/files/${file.id}`} download>
                      Download
                    </a>
                    <Link to={`/files/${file.id}`}>View</Link>
                    <button onClick={() => handleEdit(file)}>Edit</button>
                    <button onClick={() => handleDelete(file.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Render FileEditModal if modal is open */}
          {isModalOpen && (
            <FileEditModal
              file={editFile}
              onClose={handleCloseModal}
              onFileUpdated={handleFileUpdated}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
