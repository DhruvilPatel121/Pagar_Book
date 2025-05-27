import React from 'react';
import { FaTimes } from 'react-icons/fa';

const AssignTaskDetail = ({ task, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1000]" />
      <div className="fixed inset-y-0 right-5 top-6 bottom-6 w-[700px] bg-white shadow-lg z-[1001] overflow-y-auto rounded-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {task.name}
                <span className={`text-xs px-2 py-1 rounded ${
                  task.status === 'DONE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {task.status}
                </span>
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Task Assigned by: {task.assignedBy} | Task ID: {task.taskId}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer">
              <FaTimes size={20} />
            </button>
          </div>

          {/* Task Details */}
          <div className="space-y-6">
            {/* Date and Time Section */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Date</h3>
                <p className="font-medium">{task.date}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Checked in time</h3>
                <p className="font-medium">{task.checkedInTime}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Scheduled time</h3>
                <p className="font-medium">{task.scheduledTime || '---'}</p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Customer Name</h3>
                <p className="font-medium">{task.customerName}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Customer contact number</h3>
                <p className="font-medium">{task.customerContact}</p>
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Customer Address</h3>
                <p className="font-medium">{task.customerAddress}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Actual Address</h3>
                <p className="font-medium">{task.actualAddress}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Description</h3>
              <p className="font-medium">{task.description || '---'}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignTaskDetail;
