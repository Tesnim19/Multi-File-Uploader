import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadModal.css';

const MAX_FILE_SIZE_MB = 10; // Maximum file size allowed in MB

interface File {
  type: string | undefined;
  name(arg0: string, blob: Blob, name: any): unknown;
  id: string;
  description: string;
  url: string;
  filename: string;
}

interface UploadModalProps {
  onClose: () => void; // Function to close the modal
  onFileAdded: (newFiles: File[]) => void; // Define the prop
}

const UploadModal: React.FC<UploadModalProps> = ({ onClose, onFileAdded }) => {
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);
  const [fileSizeErrors, setFileSizeErrors] = useState<{ message: string; hasError: boolean }[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = [...files];
      const fileSize = event.target.files[0].size / (1024 * 1024); // Calculate file size in MB
      if (fileSize > MAX_FILE_SIZE_MB) {
        setFileSizeErrors(prevErrors => [...prevErrors.slice(0, index), { message: `File exceeds maximum size (${MAX_FILE_SIZE_MB}MB)`, hasError: true }, ...prevErrors.slice(index + 1)]);
      } else {
        setFileSizeErrors(prevErrors => [...prevErrors.slice(0, index), { message: '', hasError: false }, ...prevErrors.slice(index + 1)]);
      }
      newFiles[index] = event.target.files[0] as unknown as File;
      setFiles(newFiles);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newDescriptions = [...descriptions];
    newDescriptions.splice(index, 1);
    setDescriptions(newDescriptions);

    setFileSizeErrors(prevErrors => [...prevErrors.slice(0, index), ...prevErrors.slice(index + 1)]);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('Please add at least one file before submitting.');
      return;
    }

    if (fileSizeErrors.some(error => error.hasError)) {
      alert('Please fix file size errors before submitting.');
      return;
    }

    if (descriptions.some(desc => !desc.trim())) {
      alert('Please provide a description for each file before submitting.');
      return;
    }

    try {
      const formData = new FormData();
      files.forEach((file: File | null, index: number) => {
        if (file) {
          formData.append(`files[]`, file as unknown as Blob);
          formData.append(`description${index}`, descriptions[index] || '');
        }
      });
      await axios.post('http://localhost:3000/api/files', formData);
      alert('Files uploaded successfully');
      const response = await axios.get('http://localhost:3000/api/files');
      const updatedFiles: File[] = response.data;
      onFileAdded(updatedFiles);
      setFiles([]);
      setDescriptions([]);
      setFileSizeErrors([]);
      onClose(); 
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  const handleAddFile = () => {
    setFiles([...files, null]);
    setDescriptions([...descriptions, '']);
    setFileSizeErrors([...fileSizeErrors, { message: '', hasError: false }]);
  };

  return (
    <div className="upload-modal">
      <h2 className="upload-modal-header">Upload Your Files Here</h2>
      {files.map((file, index) => (
        <div key={index} className="file-input-row">
          <input type="file" name={`files${index}`} onChange={(event) => handleFileChange(event, index)} />
          <input
            type="text"
            placeholder="Description"
            value={descriptions[index] || ''}
            onChange={(event) => handleDescriptionChange(event, index)}
          />
          {file && <button className="remove-button" onClick={() => handleRemoveFile(index)}>Remove</button>}
          {fileSizeErrors[index].hasError && <div className="error">{fileSizeErrors[index].message}</div>}
        </div>
      ))}
      <div className="button-row">
        <button className="add-button" onClick={handleAddFile}>Add Files</button>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default UploadModal;
