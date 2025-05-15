import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaCalendarAlt, FaDownload, FaEnvelope, FaPrint, FaUser } from 'react-icons/fa';
import { colors, componentStyles, typography, spacing } from '../theme.js';

function PayrollDetail() {
  const { empId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payPeriod, setPayPeriod] = useState('May 2023');
  
  // Mock data for the employee details
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEmployee({
        id: empId,
        name: 'Rahul Sharma',
        designation: 'Senior Developer',
        department: 'Engineering',
        joiningDate: '2021-03-15',
        bankAccount: 'XXXX-XXXX-1234',
        basicSalary: 25000,
        hra: 5000,
        conveyanceAllowance: 1500,
        medicalAllowance: 1200,
        specialAllowance: 3000,
        providentFund: 1800,
        professionalTax: 200,
        incomeTax: 2500,
        overtimeHours: 12,
        overtimeRate: 250,
        overtimePay: 3000,
        totalEarnings: 35700,
        totalDeductions: 4500,
        netPay: 31200,
        attendance: {
          present: 22,
          absent: 2,
          halfDay: 1,
          leave: 3,
          total: 28
        }
      });
      setLoading(false);
    }, 800);
  }, [empId]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 shadow-lg rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className={typography.header}>Payroll Details</h1>
          <div className="flex space-x-2">
            <button className={componentStyles.reportButton}>
              <FaPrint className="mr-2" />
              <span>Print</span>
            </button>
            <button className={componentStyles.reportButton}>
              <FaDownload className="mr-2" />
              <span>Download</span>
            </button>
            <button className={componentStyles.reportButton}>
              <FaEnvelope className="mr-2" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </header>
      
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        <div className="p-4">
          <Link to="/payroll" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <FaArrowLeft className="mr-2" /> Back to Payroll
          </Link>
          
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Pay Period Selector */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
                <div className="flex items-center">
                  <FaCalendarAlt className="text-blue-500 mr-2" />
                  <span className="font-medium">Pay Period:</span>
                </div>
                <div className="relative">
                  <select 
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    value={payPeriod}
                    onChange={(e) => setPayPeriod(e.target.value)}
                  >
                    <option>May 2024</option>
                    <option>April 2024</option>
                    <option>March 2024</option>
                    <option>February 2024</option>
                    <option>January 2024</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Employee Info Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className="bg-blue-100 rounded-full p-3 mr-4">
                      <FaUser className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{employee.name}</h2>
                      <p className="text-gray-600">{employee.designation} • {employee.department}</p>
                      <p className="text-sm text-gray-500">Employee ID: {employee.id}</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Net Pay</h3>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(employee.netPay)}</p>
                  </div>
                </div>
              </div>
              
              {/* Salary Breakdown */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Salary Breakdown</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Earnings */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b">Earnings</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Basic Salary</span>
                        <span className="font-medium">{formatCurrency(employee.basicSalary)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">HRA</span>
                        <span className="font-medium">{formatCurrency(employee.hra)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conveyance Allowance</span>
                        <span className="font-medium">{formatCurrency(employee.conveyanceAllowance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Medical Allowance</span>
                        <span className="font-medium">{formatCurrency(employee.medicalAllowance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Special Allowance</span>
                        <span className="font-medium">{formatCurrency(employee.specialAllowance)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overtime Pay</span>
                        <span className="font-medium">{formatCurrency(employee.overtimePay)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-medium">
                        <span className="text-gray-800">Total Earnings</span>
                        <span className="text-green-600">{formatCurrency(employee.totalEarnings)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Deductions */}
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-3 pb-2 border-b">Deductions</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provident Fund</span>
                        <span className="font-medium">{formatCurrency(employee.providentFund)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Professional Tax</span>
                        <span className="font-medium">{formatCurrency(employee.professionalTax)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Income Tax</span>
                        <span className="font-medium">{formatCurrency(employee.incomeTax)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t font-medium">
                        <span className="text-gray-800">Total Deductions</span>
                        <span className="text-red-600">{formatCurrency(employee.totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Net Pay */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-800">Net Pay</span>
                    <span className="text-xl font-bold text-blue-600">{formatCurrency(employee.netPay)}</span>
                  </div>
                </div>
              </div>
              
              {/* Attendance Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Attendance Summary</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Present</p>
                    <p className="text-xl font-bold text-green-600">{employee.attendance.present}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Absent</p>
                    <p className="text-xl font-bold text-red-500">{employee.attendance.absent}</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Half Day</p>
                    <p className="text-xl font-bold text-orange-500">{employee.attendance.halfDay}</p>
                  </div>
                  <div className="bg-teal-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Leave</p>
                    <p className="text-xl font-bold text-teal-600">{employee.attendance.leave}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Overtime</p>
                    <p className="text-xl font-bold text-blue-600">{employee.overtimeHours} hrs</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PayrollDetail;