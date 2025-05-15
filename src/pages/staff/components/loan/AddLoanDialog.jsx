import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';

const NewLoanDialog = ({ isOpen, onClose, staffData }) => {
  const [formData, setFormData] = useState({
    staff: staffData?.id || '',
    loanName: '',
    description: '',
    principal: '',
    tenure: '',
    annualInterestRate: '',
    interestType: '',
    disbursementDate: '',
    instalmentStartMonth: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">New Loan</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <IoClose size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Staff Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Staff</label>
                <input
              type="text"
              value={staffData?.name || ''}
              disabled
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-gray-50"
            />
              </div>

              {/* Loan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Name</label>
                <input
                  type="text"
                  placeholder="Enter Loan Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.loanName}
                  onChange={(e) => setFormData({ ...formData, loanName: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter Description"
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Loan Interest Preset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Interest Preset</label>
                <div className="flex items-center gap-2">
                  <input type="radio" id="custom" name="interestPreset" value="custom" defaultChecked />
                  <label htmlFor="custom">Custom</label>
                </div>
              </div>

              {/* Principal and Tenure */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Principal</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
                    <input
                      type="text"
                      placeholder="Enter Principal"
                      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.principal}
                      onChange={(e) => setFormData({ ...formData, principal: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tenure</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter Tenure"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={formData.tenure}
                      onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">month(s)</span>
                  </div>
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Annual Interest Rate"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.annualInterestRate}
                    onChange={(e) => setFormData({ ...formData, annualInterestRate: e.target.value })}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                </div>
              </div>

              {/* Interest Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interest Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.interestType}
                  onChange={(e) => setFormData({ ...formData, interestType: e.target.value })}
                >
                  <option value="">Select Interest Type</option>
                  <option value="simple">Simple Interest</option>
                  <option value="compound">Compound Interest</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Disbursement Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.disbursementDate}
                    onChange={(e) => setFormData({ ...formData, disbursementDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instalment Start Month</label>
                  <input
                    type="month"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.instalmentStartMonth}
                    onChange={(e) => setFormData({ ...formData, instalmentStartMonth: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Loan
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewLoanDialog