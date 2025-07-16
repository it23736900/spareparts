import React from 'react';

const statusOptions = [
  { label: 'Pending', value: 'pending', color: 'bg-yellow-400 text-black' },
  { label: 'In Progress', value: 'in_progress', color: 'bg-blue-500' },
  { label: 'Waiting Reply', value: 'waiting_reply', color: 'bg-purple-500' },
  { label: 'Resolved', value: 'resolved', color: 'bg-green-500' },
  { label: 'Closed', value: 'closed', color: 'bg-gray-600' },
];

const InquiryStatusSelect = ({ currentStatus, onChange }) => {
  return (
    <select
      value={currentStatus}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 rounded-lg font-medium focus:outline-none transition duration-200 ${
        statusOptions.find((s) => s.value === currentStatus)?.color || 'bg-gray-700'
      }`}
    >
      {statusOptions.map((status) => (
        <option key={status.value} value={status.value} className="text-white bg-[#0B1C1F]">
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default InquiryStatusSelect;
