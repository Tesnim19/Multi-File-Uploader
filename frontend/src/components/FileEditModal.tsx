import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface CustomFile {
  id: number;
  description: string;
  filepath: string;
}

interface Props {
  file: CustomFile;
  onClose: () => void;
  onFileUpdated: () => void;
}

const FileEditModal: React.FC<Props> = ({ file, onClose, onFileUpdated }) => {
  const [description, setDescription] = useState<string>(file.description);
  const [newFile, setNewFile] = useState<File | null>(null); // Use built-in File interface

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files?.[0];
    if (fileInput) {
      setNewFile(fileInput);
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('description', description);
      if (newFile) {
        formData.append('file', newFile);
      }
      await axios.put(`http://localhost:3000/api/files/${file.id}`, formData);
      onFileUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="text" value={description} onChange={handleDescriptionChange} />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default FileEditModal;
