import React, { useState } from 'react';

interface ClipboardCopyProps {
  textToCopy: string;
  buttonText: string;
}

const ClipboardCopy: React.FC<ClipboardCopyProps> = ({ textToCopy, buttonText }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    // Create a temporary input element to copy text to clipboard
    const input = document.createElement('input');
    input.value = textToCopy;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    // Update the state to indicate that text has been copied
    setIsCopied(true);

    // Reset the "copied" state after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <button className='font-mono bg-white w-[100%] text-black px-3' onClick={copyToClipboard}>
        {isCopied ? 'Copied!' : buttonText}
      </button>
    </div>
  );
};

export default ClipboardCopy;
