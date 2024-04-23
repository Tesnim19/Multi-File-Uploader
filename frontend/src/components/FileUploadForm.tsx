import React, { useState } from 'react';
import axios from 'axios';

interface FileUploadProps {
  onFileUpload: (file: File, description: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Create FormData object
      const formData = new FormData();
      formData.append('files', selectedFile);
      formData.append('description', description); // Append description to FormData

      // Make HTTP POST request to backend
      axios.post('http://localhost:3000/api/files', formData)
        .then(response => {
          // Handle successful response
          console.log('File uploaded successfully:', response.data);
          onFileUpload(selectedFile, description);
          setSelectedFile(null);
          setDescription(''); // Clear description field after successful upload
        })
        .catch(error => {
          // Handle error
          console.error('Error uploading file:', error);
        });
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={handleFileChange} />
      <input type="text" placeholder="Description" value={description} onChange={handleDescriptionChange} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
        onClick={handleSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
