import React, { useState } from 'react';
import axios from 'axios';

const FileUploadForm: React.FC = () => {
  const [files, setFiles] = useState<(File | null)[]>([]);
  const [descriptions, setDescriptions] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = [...files];
      newFiles[index] = event.target.files[0];
      setFiles(newFiles);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = event.target.value;
    setDescriptions(newDescriptions);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        if (file) {
          formData.append(`files[]`, file);
          formData.append(`description${index}`, descriptions[index]);
        }
      });
      await axios.post('http://localhost:3000/api/files', formData);
      alert('Files uploaded successfully');
      setFiles([]);
      setDescriptions([]);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  const handleAddFile = () => {
    setFiles([...files, null]);
    setDescriptions([...descriptions, '']);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);

    const newDescriptions = [...descriptions];
    newDescriptions.splice(index, 1);
    setDescriptions(newDescriptions);
  };

  return (
    <div>
      {files.map((file, index) => (
        <div key={index}>
          <input type="file" name={`files${index}`} onChange={(event) => handleFileChange(event, index)} />
          <input type="text" value={descriptions[index] || ''} onChange={(event) => handleDescriptionChange(event, index)} />
          {file && <button type="button" onClick={() => handleRemoveFile(index)}>Remove</button>}
        </div>
      ))}
      <button type="button" onClick={handleAddFile}>Add File</button>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FileUploadForm;
