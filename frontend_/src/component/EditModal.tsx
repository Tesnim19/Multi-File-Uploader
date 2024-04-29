import React, { useState } from 'react';
import '../styles/UploadModal.css';

interface File {
  id: string;
  description: string;
  filepath: string;
  filename: string;
}

interface EditModalProps {
  file: File | null;
  onClose: () => void; 
  onEditSubmit: (editedFile: File) => Promise<void>;
}

const EditModal: React.FC<EditModalProps> = ({ file, onClose, onEditSubmit }) => {
  const [editedFile, setEditedFile] = useState<File | null>(file);
  const [newFile, setNewFile] = useState<File | null>(null);

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editedFile) {
      setEditedFile({
        ...editedFile,
        description: event.target.value,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setNewFile({
        id: editedFile?.id ?? '',
        description: editedFile?.description ?? '',
        filepath: URL.createObjectURL(selectedFile),
        filename: selectedFile.name,
      });

      const newDescription = typeof editedFile?.description === 'string' ? editedFile.description : '';

      // Also update editedFile
      setEditedFile({
        ...editedFile!,
        id: editedFile?.id ?? '', 
        filename: selectedFile.name,
        description: editedFile?.description ?? '', 
      });
    }
  };

  const handleSubmit = async () => {
    if (editedFile) {
      if (newFile) {
        setEditedFile(newFile);
      }
      await onEditSubmit(editedFile);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="upload-modal">
      <h2 className="upload-modal-header">Edit File</h2>
      {editedFile && (
        <div className="file-info">
          <p>
            <strong>File Name:</strong> {editedFile.filename}
          </p>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" value={editedFile.description} onChange={handleDescriptionChange} />
          <label htmlFor="file">Upload New File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
      )}
      <div className="button-row">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditModal;
