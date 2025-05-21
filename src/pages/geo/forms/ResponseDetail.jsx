// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FaArrowLeft, FaDownload, FaPrint, FaCalendarAlt, FaPhone, FaBuilding, FaIndustry, FaMapMarkerAlt } from 'react-icons/fa';
// import GeoSidebar from '../components/GeoSidebar';

// const ResponseDetail = () => {
//   const { responseId } = useParams();
//   const navigate = useNavigate();
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Mock data - in a real app, this would be an API call
//     setTimeout(() => {
//       const mockResponse = {
//         id: responseId,
//         formName: 'Default Template 11',
//         respondent: 'John Doe',
//         taskId: 'T-1001',
//         location: 'Mumbai, Maharashtra',
//         timestamp: '2025-05-20T09:30:00Z',
//         status: 'Completed',
//         customerVisit: 'Yes',
//         industryType: 'Retail',
//         companyName: 'ABC Retail Ltd',
//         nextCallDate: '2025-06-15',
//         contact: '+91 9876543210',
//         answers: [
//           { 
//             question: 'How would you rate our service?', 
//             answer: '4 - Very Good',
//             type: 'rating'
//           },
//           { 
//             question: 'What did you like most about our service?', 
//             answer: 'The staff was very professional and helpful. They addressed all my concerns promptly.',
//             type: 'text'
//           },
//           { 
//             question: 'Would you recommend our service to others?', 
//             answer: 'Yes',
//             type: 'boolean'
//           },
//           { 
//             question: 'Any suggestions for improvement?', 
//             answer: 'The waiting time could be reduced. Also, it would be helpful to have more parking space.',
//             type: 'text'
//           },
//           {
//             question: 'Signature',
//             answer: 'https://example.com/signatures/john-doe.png',
//             type: 'signature'
//           }
//         ],
//         attachments: [
//           {
//             name: 'Store Front Photo',
//             url: 'https://example.com/photos/store-front.jpg',
//             type: 'image'
//           }
//         ]
//       };
      
//       setResponse(mockResponse);
//       setLoading(false);
//     }, 800);
//   }, [responseId]);

//   // Format date for display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleString('en-US', options);
//   };

//   // Handle print
//   const handlePrint = () => {
//     window.print();
//   };

//   // Handle download
//   const handleDownload = () => {
//     alert('Downloading response as PDF...');
//   };

//   if (loading) {
//     return (
//       <>
//         <GeoSidebar />
//         <div className="flex justify-center items-center h-screen bg-gray-50 ml-[225px]">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </>
//     );
//   }

//   // Define styles since formStyles is commented out
//   const styles = {
//     detailContainer: "p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen ml-[225px]",
//     infoItem: "flex items-start",
//     infoIcon: "bg-blue-50 p-2 rounded-md mr-3",
//     infoLabel: "text-sm text-gray-500",
//     infoValue: "font-medium text-gray-800",
//     statusIcon: (status) => `p-2 rounded-md mr-3 ${
//       status === 'Completed' ? 'bg-green-50' : 'bg-yellow-50'
//     }`,
//     statusDot: (status) => `h-4 w-4 rounded-full ${
//       status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
//     }`,
//     statusText: (status) => `font-medium ${
//       status === 'Completed' ? 'text-green-600' : 'text-yellow-600'
//     }`,
//     detailCard: "bg-white rounded-lg shadow-sm overflow-hidden",
//     detailTitle: "text-2xl font-semibold text-gray-800 mb-4",
//     infoGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
//     metaContainer: "mt-6 pt-6 border-t border-gray-100",
//     metaInfo: "flex flex-col md:flex-row md:justify-between text-gray-600",
//     metaLabel: "font-medium",
//     responsesContainer: "p-6",
//     responsesTitle: "text-lg font-medium text-gray-800 mb-4",
//     responseItem: "bg-gray-50 p-4 rounded-md",
//     responseQuestion: "text-sm font-medium text-gray-500 mb-2",
//     responseAnswer: "text-base text-gray-800",
//     signatureContainer: "mt-2 border border-gray-200 rounded-md p-2 inline-block bg-white",
//     attachmentsContainer: "mt-8",
//     attachmentsGrid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
//     attachmentItem: "border border-gray-200 rounded-md overflow-hidden bg-white",
//     attachmentImage: "w-full h-32 object-cover",
//     attachmentName: "p-2 text-sm font-medium text-gray-700"
//   };

//   // Header component
//   const DetailPageHeader = ({ onBack, onPrint, onDownload }) => (
//     <div className="flex justify-between items-center mb-6">
//       <button 
//         onClick={onBack} 
//         className="flex items-center text-blue-600 hover:text-blue-800"
//       >
//         <FaArrowLeft className="mr-2" />
//         Back to Responses
//       </button>
      
//       <div className="flex gap-3">
//         <button 
//           onClick={onPrint}
//           className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center transition-colors"
//         >
//           <FaPrint className="mr-2" />
//           Print
//         </button>
        
//         <button 
//           onClick={onDownload}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
//         >
//           <FaDownload className="mr-2" />
//           Download PDF
//         </button>
//       </div>
//     </div>
//   );

//   // Info Item Component
//   const InfoItem = ({ icon, label, value, status = null }) => (
//     <div className={styles.infoItem}>
//       {status ? (
//         <div className={styles.statusIcon(status)}>
//           <div className={styles.statusDot(status)}></div>
//         </div>
//       ) : (
//         <div className={styles.infoIcon}>
//           {icon}
//         </div>
//       )}
//       <div>
//         <p className={styles.infoLabel}>{label}</p>
//         {status ? (
//           <p className={styles.statusText(status)}>{value}</p>
//         ) : (
//           <p className={styles.infoValue}>{value}</p>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <GeoSidebar />
//       <div className={styles.detailContainer}>
//         <DetailPageHeader 
//           onBack={() => navigate(-1)} 
//           onPrint={handlePrint} 
//           onDownload={handleDownload} 
//         />
        
//         <div className={styles.detailCard}>
//           <div className="p-6 border-b border-gray-200">
//             <h1 className={styles.detailTitle}>{response.formName}</h1>
            
//             <div className={styles.infoGrid}>
//               <InfoItem 
//                 icon={<FaBuilding className="text-blue-500" />}
//                 label="Company"
//                 value={response.companyName}
//               />
              
//               <InfoItem 
//                 icon={<FaIndustry className="text-blue-500" />}
//                 label="Industry"
//                 value={response.industryType}
//               />
              
//               <InfoItem 
//                 icon={<FaMapMarkerAlt className="text-blue-500" />}
//                 label="Location"
//                 value={response.location}
//               />
              
//               <InfoItem 
//                 icon={<FaCalendarAlt className="text-blue-500" />}
//                 label="Next Call/Visit Date"
//                 value={formatDate(response.nextCallDate)}
//               />
              
//               <InfoItem 
//                 icon={<FaPhone className="text-blue-500" />}
//                 label="Contact"
//                 value={response.contact}
//               />
              
//               <InfoItem 
//                 status={response.status}
//                 label="Status"
//                 value={response.status}
//               />
//             </div>
            
//             <div className={styles.metaContainer}>
//               <div className={styles.metaInfo}>
//                 <div>
//                   <p><span className={styles.metaLabel}>Respondent:</span> {response.respondent}</p>
//                   <p><span className={styles.metaLabel}>Task ID:</span> {response.taskId}</p>
//                 </div>
//                 <div>
//                   <p><span className={styles.metaLabel}>Submitted on:</span> {formatDate(response.timestamp)}</p>
//                   <p><span className={styles.metaLabel}>Customer Visit:</span> {response.customerVisit}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           <div className={styles.responsesContainer}>
//             <h2 className={styles.responsesTitle}>Form Responses</h2>
            
//             <div className="space-y-6">
//               {response.answers.map((item, index) => (
//                 <div key={index} className={styles.responseItem}>
//                   <h3 className={styles.responseQuestion}>{item.question}</h3>
                  
//                   {item.type === 'signature' ? (
//                     <div className={styles.signatureContainer}>
//                       <p className="text-sm text-gray-600">Signature available</p>
//                     </div>
//                   ) : item.type === 'rating' ? (
//                     <p className="text-base text-gray-800 font-medium">{item.answer}</p>
//                   ) : item.type === 'boolean' ? (
//                     <p className={`text-base font-medium ${
//                       item.answer === 'Yes' ? 'text-green-600' : 'text-red-600'
//                     }`}>
//                       {item.answer}
//                     </p>
//                   ) : (
//                     <p className={styles.responseAnswer}>{item.answer}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
            
//             {response.attachments && response.attachments.length > 0 && (
//               <div className={styles.attachmentsContainer}>
//                 <h2 className={styles.responsesTitle}>Attachments</h2>
                
//                 <div className={styles.attachmentsGrid}>
//                   {response.attachments.map((attachment, index) => (
//                     <div key={index} className={styles.attachmentItem}>
//                       <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
//                         <p className="text-sm font-medium text-gray-700">{attachment.name}</p>
//                         <p className="text-xs text-gray-500 mt-1">Attachment available</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResponseDetail;