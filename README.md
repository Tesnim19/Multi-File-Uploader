# Multi-File Uploader

This project is a multi-file uploader application developed using React with TypeScript for the front-end and Node.js with TypeScript, Express, Sequelize, and MySQL for the back-end.

## Features

- **Upload:** Users can upload multiple files with descriptions.
- **Display:** Uploaded files are displayed in a table format with options for download, view, edit, and delete.
- **Validation:** Client-side validation ensures file size limits are enforced.
- **Architecture:** Implements MVC architecture for better code organization.
- **Technologies:** Utilizes Multer for handling file uploads and Sequelize ORM for database interactions.

## Deployment

- Backend deployed on Render. Link: [https://multi-file-uploader-mbkj.onrender.com](https://multi-file-uploader-mbkj.onrender.com)
- Frontend deployed on Vercel. Link: [https://multifileuploader-3yx1cmzvg-tesnim19s-projects.vercel.app](https://multifileuploader-3yx1cmzvg-tesnim19s-projects.vercel.app)

**Note:** For the time being, the backend is only accessible through local setup. Clone the repository and follow the instructions in the README to start the backend server.

## Getting Started

1. Clone this repository.
2. To start the backend server, navigate to the backend directory
```
cd backend
npm install
npm start
```
4. Access the application through the provided Frontend URL.
Make sure to add .env file in the root directory of the backend from the .env.example for the time being

## Technologies Used

- **Frontend:** React, TypeScript, Axios
- **Backend:** Node.js, Express, TypeScript, Sequelize, MySQL

## Screens

### Main Screen (When no file is uploaded)
![Screenshot (375)](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/b3246701-f84e-489f-b890-f430b8356a33)
### Upload Modal
![Screenshot (376)](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/b4666554-16f9-4754-984b-9bce0a79d70a)
### Multiple File Upload
![Screenshot (377)](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/7c39acdd-0ffc-4606-b7ab-906a6d8e5d03)
### File Size Limit Exceeded
![Screenshot (378)](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/e13527a5-a412-42cc-a7e7-3aac4e443a1d)
### Main Screen (With Files Uploaded)
![Screenshot 2024-04-29 201719](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/49ef69d4-1677-4d15-a721-cf03151953ef)
### Edit Modal
![Screenshot 2024-04-29 201749](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/9c4c3cf9-8e68-42d6-bc3a-a2d2edfa6d4e)
### Edit Modal (File Size Limit Exceeded)
![Screenshot 2024-04-29 203643](https://github.com/Tesnim19/Multi-File-Uploader/assets/87711276/98b65801-c758-4fa9-b96f-55da50357881)

