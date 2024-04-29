// FilesTable.tsx
import React from 'react';
import '../styles/FilesTable.css';



interface File {
  id: string;
  description: string;
  filepath: string;
  filename: string; 
}

interface FilesTableProps {
  files: File[];
  onDelete: (id: string) => void;
  onEdit: (file: File) => void; 
}

const FilesTable: React.FC <FilesTableProps> = ({ files, onDelete, onEdit }) => {
  const baseUrl = 'http://localhost:3000/';

  //Function to handle download
  const handleDownload = (url: string, fileName: string) => {
    const aTag = document.createElement("a");
    aTag.href = baseUrl+url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  


  // Function to handle file view
  const handleView = (url: string) => {
    const baseUrl = 'http://localhost:3000/';
    console.log(baseUrl+url)
    window.open(baseUrl+url, '_blank');
  };

  return (
    <div className="files-table">
      <table>
        <thead>
          <tr>
            <th>File Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.filename}</td>
              <td>{file.description}</td>
              <td>
                <button onClick={ () => {handleDownload(file.filepath, file.filename)} }>Download</button>
                <button onClick={() => handleView(file.filepath)}>View</button>
                <button onClick={() => onEdit(file)}>Edit</button>
                <button onClick={() => onDelete(file.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilesTable;
