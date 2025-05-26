import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CustomFieldDialog = ({ onClose, onSave }) => {
  const [fieldData, setFieldData] = useState({
    displayName: '',
    value: 'Text',
    isMandatory: false
  });

  const handleSave = () => {
    onSave(fieldData);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1002]" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-lg z-[1003] shadow-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Custom Field</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Display Name</label>
              <input
                type="text"
                placeholder="Field Name"
                className="w-full p-2 border rounded-lg"
                value={fieldData.displayName}
                onChange={(e) => setFieldData(prev => ({ ...prev, displayName: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Value</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={fieldData.value}
                onChange={(e) => setFieldData(prev => ({ ...prev, value: e.target.value }))}
              >
                <option value="Text">Text</option>
                {/* Add more options if needed */}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="mandatory"
                checked={fieldData.isMandatory}
                onChange={(e) => setFieldData(prev => ({ ...prev, isMandatory: e.target.checked }))}
                className="rounded border-gray-300"
              />
              <label htmlFor="mandatory" className="text-sm">Mandatory Field</label>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomFieldDialog;