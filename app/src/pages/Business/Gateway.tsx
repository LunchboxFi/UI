import React, { useState } from 'react'
import Link from 'next/link'

type Props = {}

function Gateway({}: Props) {
  const [selectedToken, setSelectedToken] = useState(''); // State to track the selected token

  // Function to handle changes in the dropdown
  const handleTokenChange = (e: any) => {
    setSelectedToken(e.target.value);
  };

  return (
    <div className='w-[100%] h-[100%] flex flex-col items-center justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white text-black rounded-xl p-5 h-[100%] w-[100%]'>
         <h1 className='font-mono'>Gateway configuration</h1>
         <h3 className='font-mono mt-6'>Token</h3>
         <select
        id="tokenSelect"
        value={selectedToken}
        onChange={handleTokenChange}
        className=' bg-[#292929] outline-none w-[100%] px-3 py-2 rounded-md text-white font-mono'
      >
        <option value="">Select a token</option>
        <option value="USDC">USDC</option>
        <option value="SOL">SOL</option>
        {/* Add more options as needed */}
      </select>


      <div className='mt-3'></div>
      <div  className='font-mono mt-3'>Enter amount</div>
      <input
        type="text"
        className='bg-[#292929] outline-none w-[50%] px-3 py-2 rounded-md text-white font-mono'
      />

      <div className='mt-3'></div>
      <div  className='font-mono mt-3 text-black'>Select receiver vault number</div>
      <input
        type="text"
        className='bg-[#292929] outline-none w-[30%] px-3 py-2 rounded-md text-white font-mono'
      />
      <p className='font-mono mt-3'>Selected vault address</p>

      <div className='w-[100%] mt-6 flex justify-end'>
      <button className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Generate Gateway</button>
      </div>
         </div>
         </div>
    </div>
  )
}

export default Gateway