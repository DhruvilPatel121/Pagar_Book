import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { IoMdArrowDropdown } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const SalaryOverview = () => {
  const { staffData } = useOutletContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);

  // Mock salary data
  const salaryData = [
    {
      month: 'January 2025',
      duration: '01 January 2025 - 31 January 2025',
      amount: '5,870',
      status: 'processed'
    },
    {
      month: 'December 2024',
      duration: '01 December 2024 - 31 December 2024',
      amount: '9,520.83',
      status: 'pending'
    },
    {
      month: 'November 2024',
      duration: '01 November 2024 - 30 November 2024',
      amount: '0',
      status: 'processed'
    },
    {
      month: 'October 2024',
      duration: '01 October 2024 - 31 October 2024',
      amount: '9,520.83',
      status: 'processed'
    },
    {
      month: 'Sepetember 2024',
      duration: '01 Sepetember 2024 - 30 Sepetember 2024',
      amount: '0',
      status: 'pending'
    },
    {
      month: 'August 2024',
      duration: '01 August 2024 - 31 August 2024',
      amount: '9,520.83',
      status: 'pending'
    },
    {
      month: 'July 2024',
      duration: '01 July 2024 - 31 July 2024',
      amount: '0',
      status: 'processed'
    },
    {
      month: 'June 2024',
      duration: '01 June 2024 - 30 June 2024',
      amount: '9,520.83',
      status: 'pending'
    },
    {
      month: 'May 2024',
      duration: '01 May 2024 - 31 May 2024',
      amount: '0',
      status: 'pending'
    },
    {
      month: 'April 2024',
      duration: '01 April 2024 - 30 April 2024',
      amount: '9,520.83',
      status: 'pending'
    },
    {
      month: 'March 2024',
      duration: '01 March 2024 - 31 March 2024',
      amount: '0',
      status: 'processed'
    },
    {
      month: 'February 2024',
      duration: '01 February 2024 - 28 February 2024',
      amount: '0',
      status: 'pending'
    },
    {
      month: 'January 2024',
      duration: '01 January 2024 - 31 January 2024',
      amount: '0',
      status: 'processed'
    }
  ];

  const actionItems = [
    { label: 'Download Salary Slip', action: () => console.log('Download') },
    { label: 'Print Salary Slip', action: () => console.log('Print') },
    { label: 'Share Salary Slip', action: () => console.log('Share') },
    { label: 'Export as PDF', action: () => console.log('Export') },
  ];

  const SalaryDetailsModal = ({ salary, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-[500px] shadow-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg">Salary Details - {salary.month}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4">
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p>{salary.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`inline-block px-2 py-0.5 rounded-full text-sm
                ${salary.status === 'processed' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }`}
              >
                {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
              </span>
            </div>
          </div>

          <div>
            <h4 className="mb-4">Salary Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>Basic Salary</span>
                <span>₹ 8,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>HRA</span>
                <span>₹ 1,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Conveyance</span>
                <span>₹ 520.83</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Deductions</span>
                <span className="text-red-600">- ₹ 0.00</span>
              </div>
              <div className="flex justify-between py-2 font-medium">
                <span>Total Amount</span>
                <span>₹ {salary.amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-1.5 border rounded hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
            Download Slip
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Salary Overview</h2>
        <div className="flex justify-between gap-4">
            <div className="relative">
                <button className="border px-4 py-2 rounded-lg hover:border-blue-700 flex items-center gap-2"
                    onClick={() => setShowDropdown(!showDropdown)}>
                    Actions
                    <IoMdArrowDropdown className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                {actionItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => {
                      item.action();
                      setShowDropdown(false);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Generate Salary Slip
        </button>
        </div>
      </div>

      {/* Salary List */}
      <div className="space-y-4">
        {salaryData.map((item, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="text-blue-600 bg-blue-50 p-3 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">{item.month}</h3>
                <p className="text-sm text-gray-500">Duration: {item.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              {item.status === 'processed' && (
                <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                  Processed
                </span>
              )}
              {item.status === 'pending' && (
                <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full">
                  Pending
                </span>
              )}
              <div className="text-right">
                <p className="text-sm text-gray-500">Due Amount</p>
                <p className="font-medium">₹ {item.amount}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" onClick={() => setSelectedSalary(item)}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-4">
        <button className="text-blue-600 hover:text-blue-700">
          Load more
        </button>
      </div>

      {selectedSalary && (
        <SalaryDetailsModal 
          salary={selectedSalary} 
          onClose={() => setSelectedSalary(null)} 
        />
      )}
    </div>
  );
};

export default SalaryOverview