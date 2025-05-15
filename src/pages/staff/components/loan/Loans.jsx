import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AddLoanDialog from './AddLoanDialog'
import { useOutletContext } from 'react-router-dom';

const Loans = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Loan Details');
  const [activeFilter, setActiveFilter] = useState('All Loans');
  const [isAddLoanDialogOpen, setIsAddLoanDialogOpen] = useState(false);
  const { staffData } = useOutletContext();

  const allLoans = [
    {
      employeeName: 'MAYUR',
      employeeId: '1',
      loanName: 'EDUCATION FEE LOAN',
      principal: '₹ 20,000',
      totalPaidInstalment: '₹ 20,000',
      remainingInstalment: '₹ 0',
      disbursementDate: '19 Jun 2024',
      status: 'Closed'
    },
    {
      employeeName: 'AJAY',
      employeeId: '2',
      loanName: 'MORTGAGE LOAN',
      principal: '₹ 20,000',
      totalPaidInstalment: '₹ 0',
      remainingInstalment: '₹ 20,000',
      disbursementDate: '18 Jun 2024',
      status: 'Written Off'
    },
    {
      employeeName: 'SAVAN',
      employeeId: '3',
      loanName: 'VEHICLE LOAN',
      principal: '₹ 20,000',
      totalPaidInstalment: '₹ 20,000',
      remainingInstalment: '₹ 0',
      disbursementDate: '19 Jun 2024',
      status: 'Closed'
    },
    {
      employeeName: 'JIGNESH',
      employeeId: '4',
      loanName: 'PERSONAL LOAN',
      principal: '₹ 20,000',
      totalPaidInstalment: '₹ 0',
      remainingInstalment: '₹ 20,000',
      disbursementDate: '18 Jun 2024',
      status: 'Written Off'
    },
    {
      employeeName: 'PAVAN',
      employeeId: '5',
      loanName: 'EDUCATION FEE LOAN',
      principal: '₹ 20,000',
      totalPaidInstalment: '₹ 20,000',
      remainingInstalment: '₹ 0',
      disbursementDate: '19 Jun 2024',
      status: 'Closed'
    }
  ];

  const filteredLoans = allLoans.filter(loan => {
    const searchString = searchTerm.toLowerCase();
    return (
      loan.employeeName.toLowerCase().includes(searchString) ||
      loan.employeeId.includes(searchString) ||
      loan.loanName.toLowerCase().includes(searchString) ||
      loan.principal.includes(searchString)
    );
  });

  const displayedLoans = activeFilter === 'Open Loans' 
    ? filteredLoans.filter(loan => loan.status !== 'Closed' && loan.status !== 'Written Off')
    : filteredLoans;

  const NoResultsFound = ({ message }) => (
    <tr>
      <td colSpan="8" className="text-center py-8">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-lg font-medium">{message}</p>
        </div>
      </td>
    </tr>
  );

  const renderTableContent = () => {
    if (activeTab === 'Loan Applications') {
      return <NoResultsFound message="No loan applications found" />;
    }

    if (displayedLoans.length === 0) {
      if (searchTerm) {
        return <NoResultsFound message={`No results found for "${searchTerm}"`} />;
      }
      if (activeFilter === 'Open Loans') {
        return <NoResultsFound message="No open loans found" />;
      }
      return <NoResultsFound message="No loans found" />;
    }

    return displayedLoans.map((loan, index) => (
      <tr key={index} className="hover:bg-gray-50 transition-colors">
        <td className="py-4 px-6">{loan.employeeName}</td>
        <td className="py-4 px-6">{loan.employeeId}</td>
        <td className="py-4 px-6">{loan.loanName}</td>
        <td className="py-4 px-6 whitespace-nowrap">{loan.principal}</td>
        <td className="py-4 px-6 whitespace-nowrap">{loan.totalPaidInstalment}</td>
        <td className="py-4 px-6 whitespace-nowrap">{loan.remainingInstalment}</td>
        <td className="py-4 px-6">{loan.disbursementDate}</td>
        <td className="py-4 px-6">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
            loan.status === 'Closed'
              ? 'bg-green-50 text-green-600'
              : loan.status === 'Written Off'
              ? 'bg-red-50 text-red-600'
              : ''
          }`}>
            {loan.status}
          </span>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6">
        {/* Header Section */}
        <div className="pb-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Loans</h1>
            <button onClick={() => setIsAddLoanDialogOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors">
              + Add New Loan
            </button>
          </div>

          <div className="flex gap-8">
            {['Loan Details', 'Loan Applications', 'Loan Settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="py-6 flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, loan ID, or amount"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveFilter('All Loans')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'All Loans'
                  ? 'bg-blue-50 text-blue-600'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Loans <span className="ml-2 text-sm">{allLoans.length}</span>
            </button>
            <button
              onClick={() => setActiveFilter('Open Loans')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeFilter === 'Open Loans'
                  ? 'bg-blue-50 text-blue-600'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Open Loans <span className="ml-2 text-sm">0</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-blue-600 hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <FiFilter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Employee Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Employee ID</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Loan Name</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Principal</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Total Paid Instalment</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Remaining Instalment</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Disbursement Date</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium text-sm">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderTableContent()}
            </tbody>
          </table>
        </div>
      </div>
      <AddLoanDialog 
        isOpen={isAddLoanDialogOpen}
        onClose={() => setIsAddLoanDialogOpen(false)}
        staffData={staffData}
      />
    </div>
  );
};

export default Loans