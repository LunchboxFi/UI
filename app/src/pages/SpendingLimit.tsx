import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PublicKey } from '@solana/web3.js'

function SpendingLimit() {
  const [ splMint, setSplMint] = useState()
  const [ mintDecimals, setMintDecimals] = useState<number | null>()
  const [ selectedValue, setSelectedvalue] = useState<string>()
  const [ period, setPeriod] = useState<string>()
  const [ amount, setAmount] = useState<string>()

  
  useEffect(() => {
    const multisigPda = localStorage.getItem('multisig');
    const keys = localStorage.getItem('privateKeys')
    
    if(multisigPda && keys){

    const mintDecimals = "So11111111111111111111111111111111111111112" ? 6 : 9;

    const payload = {
      multisigPda: multisigPda,
      keys: keys, // Replace with the actual value for 'keys'
      splMint: selectedValue,
      mintDecimals: mintDecimals,
    };
    
   (async ()=> {
    try {
      const response = await fetch('/api/setSpendingLimit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        console.log(response)
      }

      const data = await response.json();

    } catch (error) {
      console.error('Error:', error);
    }
   })();
    }
    
  },[selectedValue])

  const handleTokenChange = (e: any) => {
    setSelectedvalue(e.target.value);
  };


  return (
    <div className='w-[100%] h-[100%] flex justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono text-2xl'>Set Spending Limit</h1>
          <h1 className='text-black mt-8 font-mono'>Token Name</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <select
          id="currencySelect"
          className="font-mono outline-none bg-[#292929] "
          value={selectedValue}
          onChange={handleTokenChange}
          >
        <option value="">Select a Token</option>
        <option value="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v">USDC</option>
        <option value="So11111111111111111111111111111111111111112">SOL</option>
        </select>

          </div>
          </div>

          <h1 className='text-black mt-8 font-mono'>Select Period</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <select
          id="currencySelect"
          className="font-mono outline-none bg-[#292929] "
          // value={selectedValue}
          // onChange={handleSelectChange}
          >
        <option value="">How long should the spending limit last</option>
        <option value="OneTime">One Time</option>
        <option value="Day">Daily</option>
        <option value="Week">Weekly</option>
        <option value="Month">Monthly</option>
        </select>
          </div>

          </div>

          <h1 className='text-black mt-8 font-mono'>Set spending limit</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <input 
          className='font-mono bg-[#292929] outline-none'

          placeholder='e.g 100 (USDC)'
          />
          </div>
          
          <button className='font-mono rounded-md bg-white h-[100%] border-[3px] border-[#292929] w-[45%] text-black px-3'>Set Limit</button>
         
          </div>

          <h1 className='text-black mt-8 font-mono'>Primary Key needed for 2FA</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <input 
          className='font-mono bg-[#292929] outline-none'
          placeholder='Private key signature for 2FA'
          />
          </div>
          
          <button className='font-mono rounded-md bg-white h-[100%] border-[3px] border-[#292929] w-[45%] text-black px-3'>Set Limit</button>
         
          </div>

         </div>
         </div>
    </div>
  )
}

export default SpendingLimit