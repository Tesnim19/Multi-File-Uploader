import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UploadModal.css';

const MAX_FILE_SIZE_MB = 10; 

interface File {
  type: string | undefined;
  name(arg0: string, blob: Blob, name: any): unknown;
  id: string;
  description: string;
  url: string;
  filename: string; 
}

interface UploadModalProps {
  onClose: () => void; 
  onFileAdded: (newFiles: File[]) => void; 
}

const UploadModal: React.FC < UploadModalProps> = ({ onClose , onFileAdded}) => {
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = [...files];
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
  };
  
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      files.forEach((file: File | null, index: number) => { 
        if (file) {
          formData.append(`files[]`, file as unknown as Blob ); 
          formData.append(`description${index}`, descriptions[index] || ''); 
        }
      });
      await axios.post('http://localhost:3000/api/files', formData);

      const response = await axios.get('http://localhost:3000/api/files');
      const updatedFiles: File[] = response.data;
      onFileAdded(updatedFiles);
      setFiles([]);
      setDescriptions([]);
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
  };

  return (
    <div className="upload-modal">
      <h2 className='upload-modal-header' >Upload Your Files Here</h2>
      {files.map((file, index) => (
        <div key={index} className="file-input-row">
          <input type="file" name={`files${index}`} onChange={(event) => handleFileChange(event, index)} />
          <input type="text" placeholder="Description" value={descriptions[index] || ''} onChange={(event) => handleDescriptionChange(event, index)} />
          {file && <button className="remove-button" onClick={() => handleRemoveFile(index)}>Remove</button>}
        </div>
      ))}
      <div className="button-row">
        <button className='add-button' onClick={handleAddFile}>Add Files</button>
        <button className='submit-button' onClick={handleSubmit}>Submit</button>
      </div>
      <button className="cancel-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default UploadModal;
