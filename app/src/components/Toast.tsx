import React from 'react';

type ToastProps = {
    message: string;
    type: 'error' | 'success';
    onClose: () => void;
  };

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
 const toastStyles =
    type === 'error'
      ? 'bg-red-500 text-white'
      : type === 'success'
      ? 'bg-green-500 text-white'
      : 'bg-gray-500 text-white'; // Default style
  return (
    <div className={`fixed bottom-5 border-[#00000060] border-[1px] right-5 p-4 bg-opacity-20 backdrop-filter backdrop-blur-2xl rounded-3xl bg-white ${toastStyles} backdrop-saturate-150`}>
    <p className="text-white text-xl font-mono">{message}</p>
    <button
      className="ml-2 text-sm font-mono text-gray-300"
      onClick={onClose}
    >
      Close
    </button>
  </div>
  );
};

export default Toast;

