import React from 'react';

const Notification = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed bottom-6 right-6 ${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-4 z-50 animate-in slide-in-from-right duration-300`}>
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="hover:opacity-75 transition-opacity">✕</button>
    </div>
  );
};

export default Notification;
