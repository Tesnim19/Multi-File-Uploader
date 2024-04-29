import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MainScreen.css';
import FilesTable from './FilesTable';
import UploadModal from './UploadModal';
import EditModal from './EditModal';
import Header from './Header';
import image from '../assets/image.png';

interface File {
  id: string;
  description: string;
  filepath: string;
  filename: string;
}

const MainScreen: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [editedFile, setEditedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []); // Fetch files on initial render

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files');
      console.log("Server response:", response.data);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleCloseModal = () => {
    setShowUploadModal(false);
    setShowEditModal(false);
  };

  const handleEdit = (file: File) => {
    setEditedFile(file);
    setShowEditModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/files/${id}`);
      fetchFiles(); 
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleEditSubmit = async (editedFile: File) => {
    try {
      const requestBody = {
        id: editedFile.id,
        filepath: editedFile.filepath,
        filename: editedFile.filename,
        // Additional property
        newDescription: editedFile.description || '',
      };
  
      await axios.put(`http://localhost:3000/api/files/${editedFile.id}`, requestBody);
      const updatedFiles = files.map(f => (f.id === editedFile.id ? editedFile : f));
      setFiles(updatedFiles);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing file:', error);
    }
  };

  return (
    <div className="main-screen">
      <Header />
      <div className="overlay-container" style={{ display: showUploadModal || showEditModal ? 'block' : 'none' }} onClick={handleCloseModal} />
      <div className="modal-container">
        {files.length === 0 ? (
          <div className="no-files-container">
            <img className='image' src={image} alt="No files uploaded" />
            <p className="no-files-text">No files uploaded yet</p>
            <button className="upload-button" onClick={handleUploadClick}>Upload</button>
          </div>
        ) : (
          <div className="no-files-container">
            <div className="files-table">
              <FilesTable files={files} onDelete={handleDelete} onEdit={handleEdit} />
            </div>
            <button className="upload-button" onClick={handleUploadClick}>Upload</button>
          </div>
        )}
        {showUploadModal && <UploadModal onClose={handleCloseModal} onFileAdded={fetchFiles} />}
        {showEditModal && <EditModal file={editedFile} onClose={handleCloseModal} onEditSubmit={handleEditSubmit} />}
      </div>
    </div>
  );
};

export default MainScreen;
