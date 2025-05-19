// import React, { useState } from 'react';

// const YTDStatement = () => {
//   const [activeTab, setActiveTab] = useState('YTD Statement');
  
//   const ytdData = {
//     earnings: [
//       {
//         item: 'Gross',
//         totalInINR: '₹ 40,624.99',
//         months: { 
//           'Apr 2024': '-', 
//           'May 2024': '-', 
//           'Jun 2024': '-', 
//           'Jul 2024': '₹ 8,000', 
//           'Aug 2024': '₹ 7,200', 
//           'Sep 2024': '₹ 7,614.17', 
//           'Oct 2024': '₹ 9,082.49', 
//           'Nov 2024': '₹ 8,728.33',
//           'Dec 2024': '-',
//           'Jan 2025': '-',
//           'Feb 2025': '-',
//           'Mar 2025': '-'
//         }
//       },
//       {
//         item: 'Overtime',
//         totalInINR: '₹ 1,424.99',
//         months: { 
//           'Apr 2024': '-', 
//           'May 2024': '-', 
//           'Jun 2024': '-', 
//           'Jul 2024': '-', 
//           'Aug 2024': '-', 
//           'Sep 2024': '₹ 14.17', 
//           'Oct 2024': '₹ 682.49', 
//           'Nov 2024': '₹ 728.33',
//           'Dec 2024': '-',
//           'Jan 2025': '-',
//           'Feb 2025': '-',
//           'Mar 2025': '-'
//         }
//       },
//       {
//         item: 'System Basic',
//         totalInINR: '₹ 39,200',
//         months: { 
//           'Apr 2024': '-', 
//           'May 2024': '-', 
//           'Jun 2024': '-', 
//           'Jul 2024': '₹ 8,000', 
//           'Aug 2024': '₹ 7,200', 
//           'Sep 2024': '₹ 7,600', 
//           'Oct 2024': '₹ 8,400', 
//           'Nov 2024': '₹ 8,000',
//           'Dec 2024': '-',
//           'Jan 2025': '-',
//           'Feb 2025': '-',
//           'Mar 2025': '-'
//         }
//       }
//     ],
//     deductions: [
//       {
//         item: 'Gross',
//         totalInINR: '₹ 1,093.34',
//         months: { 
//           'Apr 2024': '-', 
//           'May 2024': '-', 
//           'Jun 2024': '-', 
//           'Jul 2024': '-', 
//           'Aug 2024': '₹ 6.67', 
//           'Sep 2024': '₹ 1,086.67', 
//           'Oct 2024': '-', 
//           'Nov 2024': '-',
//           'Dec 2024': '-',
//           'Jan 2025': '-',
//           'Feb 2025': '-',
//           'Mar 2025': '-'
//         }
//       }
//     ]
//   };
  

//     return (
//       <div className="w-fix bg- white rounded-lg p-6">
//         <div className="flex justify-between items-center pb-6">
//           <h1 className="text-xl font-semibold">Salary Statement</h1>
//           <div className="flex gap-4">
//            <select className="border rounded-lg px-4 py-2">
//              <option>2024 - 2025</option>
//            </select>
//            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
//              Download
//            </button>
//          </div>
//         </div>
        

//         <div className="flex gap-6 border-b mb-6">
//           <button
//             className={`pb-2 ${activeTab === 'YTD Statement' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('YTD Statement')}
//             >
//             YTD Statement
//           </button>
//           <button
//             className={`pb-2 ${activeTab === 'PF YTD Statement' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('PF YTD Statement')}
//             >
//             PF YTD Statement
//           </button>
//         </div>
        

//         <div className="relative w-[900px]">
//           <div className="flex border rounded-lg">  
//             {/* Fixed columns */}
//            <div className="w-[400px] flex-shrink-0 border-r">
//              <table className="w-full">
//                <thead>
//                  <tr className="border-b">
//                    <th className="text-left py-3 pr-4 text-gray-500 font-medium w-[200px]">Item</th>
//                    <th className="text-right py-3 pl-4 text-gray-500 font-medium w-[200px]">Total in INR</th>
//                  </tr>
//                </thead>
               
//                <tbody className="divide-y">
//                  <tr className="bg-gray-50">
//                    <td colSpan={2} className="py-3 px-4 font-medium">Earnings</td>
//                  </tr>
//                  {ytdData.earnings.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-3 px-4">{item.item}</td>
//                     <td className="py-3 px-4 text-right">{item.totalInINR}</td>
//                   </tr>
//                  ))}
//                  <tr className="bg-gray-50">
//                    <td colSpan={2} className="py-3 px-4 font-medium">Deductions</td>
//                  </tr>
//                  {ytdData.deductions.map((item, index) => (
//                   <tr key={index}>
//                     <td className="py-3 px-4">{item.item}</td>
//                     <td className="py-3 px-4 text-right">{item.totalInINR}</td>
//                   </tr>
//                  ))}
//                </tbody>
//               </table>
//            </div>
           
//            {/* Scrollable months section */}
//            <div className="w-full overflow-x-auto">
//             <table className="w-full">
//                <thead>
//                  <tr className="border-b">
//                    {Object.keys(ytdData.earnings[0].months).map(month => (
//                     <th key={month} className="py-3 px-4 text-gray-500 font-medium text-right whitespace-nowrap w-[140px]">
//                       {month}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
              
//               <tbody className="divide-y">
//                  <tr className="bg-gray-50">
//                    <td colSpan={12} className="py-6 px-4 font-medium"></td>
//                  </tr>
//                  {ytdData.earnings.map((item, index) => (
//                   <tr key={index}>
//                     {Object.values(item.months).map((value, i) => (
//                       <td key={i} className="py-3 px-4 text-right whitespace-nowrap w-[140px]">{value}</td>
//                     ))}
//                   </tr>
//                  ))}
//                  <tr className="bg-gray-50">
//                    <td colSpan={12} className="py-6 px-4 font-medium"></td>
//                  </tr>
//                  {ytdData.deductions.map((item, index) => (
//                   <tr key={index}>
//                     {Object.values(item.months).map((value, i) => (
//                       <td key={i} className="py-3 px-4 text-right whitespace-nowrap w-[140px]">{value}</td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table> 
//            </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
  
//   export default YTDStatement


















import React, { useState } from 'react';


const YTDStatement = () => {
  const [activeTab, setActiveTab] = useState('YTD Statement');
  
  const ytdData = {
    earnings: [
      {
        item: 'Gross',
        totalInINR: '₹ 40,624.99',
        months: { 
          'Apr 2024': '-', 
          'May 2024': '-', 
          'Jun 2024': '-', 
          'Jul 2024': '₹ 8,000', 
          'Aug 2024': '₹ 7,200', 
          'Sep 2024': '₹ 7,614.17', 
          'Oct 2024': '₹ 9,082.49', 
          'Nov 2024': '₹ 8,728.33',
          'Dec 2024': '-',
          'Jan 2025': '-',
          'Feb 2025': '-',
          'Mar 2025': '-'
        }
      },
      {
        item: 'Overtime',
        totalInINR: '₹ 1,424.99',
        months: { 
          'Apr 2024': '-', 
          'May 2024': '-', 
          'Jun 2024': '-', 
          'Jul 2024': '-', 
          'Aug 2024': '-', 
          'Sep 2024': '₹ 14.17', 
          'Oct 2024': '₹ 682.49', 
          'Nov 2024': '₹ 728.33',
          'Dec 2024': '-',
          'Jan 2025': '-',
          'Feb 2025': '-',
          'Mar 2025': '-'
        }
      },
      {
        item: 'System Basic',
        totalInINR: '₹ 39,200',
        months: { 
          'Apr 2024': '-', 
          'May 2024': '-', 
          'Jun 2024': '-', 
          'Jul 2024': '₹ 8,000', 
          'Aug 2024': '₹ 7,200', 
          'Sep 2024': '₹ 7,600', 
          'Oct 2024': '₹ 8,400', 
          'Nov 2024': '₹ 8,000',
          'Dec 2024': '-',
          'Jan 2025': '-',
          'Feb 2025': '-',
          'Mar 2025': '-'
        }
      }
    ],
    deductions: [
      {
        item: 'Gross',
        totalInINR: '₹ 1,093.34',
        months: { 
          'Apr 2024': '-', 
          'May 2024': '-', 
          'Jun 2024': '-', 
          'Jul 2024': '-', 
          'Aug 2024': '₹ 6.67', 
          'Sep 2024': '₹ 1,086.67', 
          'Oct 2024': '-', 
          'Nov 2024': '-',
          'Dec 2024': '-',
          'Jan 2025': '-',
          'Feb 2025': '-',
          'Mar 2025': '-'
        }
      }
    ]
  };
  
  // Get months array
  const months = Object.keys(ytdData.earnings[0].months);

  return (
    <div className="flex justify-center w-full bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl mx-auto transition-all duration-300">
        <div className="rounded-lg">
          {/* Header Section */}
          <div className="pb-2 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Salary Statement</h1>
            <div className="flex gap-4">
              <select className="border rounded-lg px-4 py-2">
                <option>2024 - 2025</option>
              </select>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Download
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="pt-2">
            <div className="flex gap-6 border-b">
              <button
                className={`pb-2 ${activeTab === 'YTD Statement' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('YTD Statement')}
              >
                YTD Statement
              </button>
              <button
                className={`pb-2 ${activeTab === 'PF YTD Statement' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('PF YTD Statement')}
              >
                PF YTD Statement
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="pt-6">
            <div className="flex w-full">
              {/* Fixed columns */}
              <div className="flex-shrink-0 w-[320px]">
                <table className="w-full border rounded-l-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="text-left py-3 px-4 text-gray-500 font-medium border-r">Item</th>
                      <th className="text-right py-3 px-4 text-gray-500 font-medium border-r">Total in INR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-gray-50">
                      <td colSpan={2} className="py-3 px-4 font-medium border-r">Earnings</td>
                    </tr>
                    {ytdData.earnings.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-r">{item.item}</td>
                        <td className="py-3 px-4 text-right border-r">{item.totalInINR}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={2} className="py-3 px-4 font-medium border-r">Deductions</td>
                    </tr>
                    {ytdData.deductions.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4 border-r">{item.item}</td>
                        <td className="py-3 px-4 text-right border-r">{item.totalInINR}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Scrollable months section */}
              <div className="overflow-x-auto w-full">
                <table className="min-w-[600px] w-full border rounded-r-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      {months.map((month, idx) => (
                        <th key={month} className={`py-3 px-4 text-gray-500 font-medium text-right whitespace-nowrap w-[120px] border-r ${idx === months.length - 1 ? 'rounded-tr-lg' : ''}`}>
                          {month}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr className="bg-gray-50">
                      <td colSpan={months.length} className="py-6 px-4 font-medium"></td>
                    </tr>
                    {ytdData.earnings.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item.months).map((value, i) => (
                          <td key={i} className={`py-3 px-4 text-right whitespace-nowrap w-[120px] border-r ${i === months.length - 1 ? 'rounded-br-lg' : ''}`}>{value}</td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td colSpan={months.length} className="py-6 px-4 font-medium"></td>
                    </tr>
                    {ytdData.deductions.map((item, index) => (
                      <tr key={index}>
                        {Object.values(item.months).map((value, i) => (
                          <td key={i} className={`py-3 px-4 text-right whitespace-nowrap w-[120px] border-r ${i === months.length - 1 ? 'rounded-br-lg' : ''}`}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YTDStatement  