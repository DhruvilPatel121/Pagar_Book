import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaUpload } from 'react-icons/fa';

const ManageCustomersBulk = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const fileType = file.name.split('.').pop().toLowerCase();
      if (['xls', 'xlsx', 'csv'].includes(fileType)) {
        // Check file size (5MB limit)
        if (file.size <= 5 * 1024 * 1024) {
          setSelectedFile(file);
          setUploadStatus('');
        } else {
          setUploadStatus('File size exceeds 5MB limit');
          setSelectedFile(null);
        }
      } else {
        setUploadStatus('Invalid file format. Only xls, xlsx, and csv are supported.');
        setSelectedFile(null);
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // In a real app, you would handle the file upload to a server here
      // For now, we'll just simulate success
      setUploadStatus('Uploading...');
      setTimeout(() => {
        setUploadStatus('File uploaded successfully!');
        // Navigate back after successful upload
        setTimeout(() => navigate('/geo/customers'), 1500);
      }, 1000);
    } else {
      setUploadStatus('Please select a file first');
    }
  };

  const handleDownloadTemplate = () => {
    // In a real app, this would trigger a file download
    // For now, we'll just log a message
    console.log('Template download initiated');
  };

  return (
    <div className="mx-auto px-4 py-6 bg-white">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/geo/customers')} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" /> Back to Customers
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-8">Manage Customers in Bulk</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="border border-gray-300 rounded-lg p-4 bg-white flex flex-col items-center">
          <div className="text-gray-500 font-medium mb-2">01.</div>
          <h3 className="font-medium text-gray-800 mb-1">Manage customer staff mapping</h3>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 flex bg-white flex-col items-center">
          <div className="text-gray-500 font-medium mb-2">02.</div>
          <h3 className="font-medium text-gray-800 mb-1">Add more customers in bulk</h3>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 flex flex-col bg-white items-center">
          <div className="text-gray-500 font-medium mb-2">03.</div>
          <h3 className="font-medium text-gray-800 mb-1">Bulk remove customers</h3>
        </div>

        <div className="border border-gray-300 rounded-lg p-4 flex flex-col bg-white items-center">
          <div className="text-gray-500 font-medium mb-2">04.</div>
          <h3 className="font-medium text-gray-800 mb-1">Bulk edit customer details</h3>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-2">Actions</h2>
          <p className="text-gray-600">Download the excel file to do these changes</p>
        </div>

        <div className="flex justify-end mb-6">
          <button 
            onClick={handleDownloadTemplate}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FaDownload className="mr-2" /> Download File
          </button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="mb-4">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <FaUpload className="text-blue-500 text-2xl" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Choose the file to be uploaded</h3>
            <p className="text-sm text-gray-500 mb-4">[only xls,xlsx and csv formats are supported.]</p>
            <p className="text-sm text-gray-500 mb-6">Maximum upload file size is 5 MB.</p>
            
            <input
              type="file"
              id="fileUpload"
              accept=".xls,.xlsx,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <label 
              htmlFor="fileUpload"
              className="flex items-center px-6 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors cursor-pointer mb-4"
            >
              <FaUpload className="mr-2" /> Choose File
            </label>
            
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-700 mb-4">
                Selected file: {selectedFile.name}
              </div>
            )}
            
            {uploadStatus && (
              <div className={`mt-2 text-sm ${uploadStatus.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {uploadStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCustomersBulk;