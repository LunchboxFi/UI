import React, { useState } from 'react';

type PopupInputProps = {
  placeholder: string;
  onSubmit: (value: string) => void;
};

const PopupInput: React.FC<PopupInputProps> = ({ placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 w-[100%] flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[50%] p-6 rounded-md">
      <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
        <input
          className='font-mono w-[100%] bg-[#292929] outline-none'
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
        />
        </div>
        </div>

        <div className="flex justify-end">
          <button
            className='bg-purple-500 mt-3 text-white font-mono px-3 py-2 rounded-xl'
            onClick={handleSubmit}
          >
            Remove Spending Limit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupInput;
