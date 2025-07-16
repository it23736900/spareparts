import React, { useState } from 'react';
import InquiryStatusSelect from './InquiryStatusSelect';

const InquiryCard = ({ inquiry }) => {
  const [status, setStatus] = useState(inquiry.status);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    // Optionally send update to backend here
    // axios.put(`/api/inquiries/${inquiry._id}`, { status: newStatus });
  };

  return (
    <div className="bg-[#13272A] text-white rounded-xl p-5 shadow-md space-y-3">
      <div className="text-sm text-gray-400">From: {inquiry.name}</div>
      <div className="text-sm text-gray-400">Email: {inquiry.email}</div>
      <div className="font-semibold text-md">Message: {inquiry.message}</div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Status:</span>
        <InquiryStatusSelect currentStatus={status} onChange={handleStatusChange} />
      </div>
    </div>
  );
};

export default InquiryCard;
