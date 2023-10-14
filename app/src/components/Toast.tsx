import React, { useEffect, useState } from 'react';


type ToastProps = {
  message: string;
  type: 'error' | 'success' | 'warning'; // Added 'warning' type
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toastStyles =
    type === 'error'
      ? 'bg-red-500 text-white'
      : type === 'success'
      ? 'bg-purple-800 text-white'
      : type === 'warning' // Condition for 'warning' type
      ? 'bg-yellow-600 text-black'
      : 'bg-gray-500 text-white'; // Default style

  return (
    <div
      className={`fixed bottom-10 left-1/2 transform ${mounted ? 'translate-x-0' : 'translate-y-full'} px-8 py-3 rounded-2xl ${toastStyles} transition-all duration-500`}
    >
      <p className="text-white text-xl font-mono">{message}</p>
      <button className="mt-2 text-sm font-mono text-gray-300" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default Toast;



