import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaDownload, FaPrint, FaCalendarAlt, FaPhone, FaBuilding, FaIndustry, FaMapMarkerAlt } from 'react-icons/fa';

const ResponseDetail = () => {
  const { responseId } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would be an API call
    setTimeout(() => {
      const mockResponse = {
        id: responseId,
        formName: 'Default Template 11',
        respondent: 'John Doe',
        taskId: 'T-1001',
        location: 'Mumbai, Maharashtra',
        timestamp: '2025-05-20T09:30:00Z',
        status: 'Completed',
        customerVisit: 'Yes',
        industryType: 'Retail',
        companyName: 'ABC Retail Ltd',
        nextCallDate: '2025-06-15',
        contact: '+91 9876543210',
        answers: [
          { 
            question: 'How would you rate our service?', 
            answer: '4 - Very Good',
            type: 'rating'
          },
          { 
            question: 'What did you like most about our service?', 
            answer: 'The staff was very professional and helpful. They addressed all my concerns promptly.',
            type: 'text'
          },
          { 
            question: 'Would you recommend our service to others?', 
            answer: 'Yes',
            type: 'boolean'
          },
          { 
            question: 'Any suggestions for improvement?', 
            answer: 'The waiting time could be reduced. Also, it would be helpful to have more parking space.',
            type: 'text'
          },
          {
            question: 'Signature',
            answer: 'https://example.com/signatures/john-doe.png',
            type: 'signature'
          }
        ],
        attachments: [
          {
            name: 'Store Front Photo',
            url: 'https://example.com/photos/store-front.jpg',
            type: 'image'
          }
        ]
      };
      
      setResponse(mockResponse);
      setLoading(false);
    }, 800);
  }, [responseId]);

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download
  const handleDownload = () => {
    alert('Downloading response as PDF...');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Back to Responses
        </button>
        
        <div className="flex gap-3">
          <button 
            onClick={handlePrint}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <FaPrint className="mr-2" />
            Print
          </button>
          
          <button 
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <FaDownload className="mr-2" />
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">{response.formName}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <FaBuilding className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="font-medium text-gray-800">{response.companyName}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <FaIndustry className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Industry</p>
                <p className="font-medium text-gray-800">{response.industryType}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <FaMapMarkerAlt className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">{response.location}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <FaCalendarAlt className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Next Call/Visit Date</p>
                <p className="font-medium text-gray-800">{formatDate(response.nextCallDate)}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-50 p-2 rounded-md mr-3">
                <FaPhone className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium text-gray-800">{response.contact}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className={`p-2 rounded-md mr-3 ${
                response.status === 'Completed' ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <div className={`h-4 w-4 rounded-full ${
                  response.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${
                  response.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {response.status}
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:justify-between text-gray-600">
              <div>
                <p><span className="font-medium">Respondent:</span> {response.respondent}</p>
                <p><span className="font-medium">Task ID:</span> {response.taskId}</p>
              </div>
              <div>
                <p><span className="font-medium">Submitted on:</span> {formatDate(response.timestamp)}</p>
                <p><span className="font-medium">Customer Visit:</span> {response.customerVisit}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Form Responses</h2>
          
          <div className="space-y-6">
            {response.answers.map((item, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{item.question}</h3>
                
                {item.type === 'signature' ? (
                  <div className="mt-2 border border-gray-200 rounded-md p-2 inline-block bg-white">
                    <img src={item.answer} alt="Signature" className="h-20" />
                  </div>
                ) : item.type === 'rating' ? (
                  <p className="text-base text-gray-800 font-medium">{item.answer}</p>
                ) : item.type === 'boolean' ? (
                  <p className={`text-base font-medium ${
                    item.answer === 'Yes' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.answer}
                  </p>
                ) : (
                  <p className="text-base text-gray-800">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
          
          {response.attachments && response.attachments.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Attachments</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {response.attachments.map((attachment, index) => (
                  <div key={index} className="border border-gray-200 rounded-md overflow-hidden bg-white">
                    {attachment.type === 'image' && (
                      <img 
                        src={attachment.url} 
                        alt={attachment.name} 
                        className="w-full h-40 object-cover"
                      />
                    )}
                    <div className="p-2 bg-gray-50">
                      <p className="text-sm font-medium text-gray-700">{attachment.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponseDetail;