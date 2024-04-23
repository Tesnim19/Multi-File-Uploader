// pages/FileUploadPage.tsx

import FileUpload from "../components/FileUploadForm";

const FileUploadPage = () => {
  const handleFileUpload = (file: any) => {
    // Handle file upload logic here
    console.log('Uploaded file:', file);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8">Upload Files</h1>
      <FileUpload onFileUpload={handleFileUpload} />
    </div>
  );
};

export default FileUploadPage;
