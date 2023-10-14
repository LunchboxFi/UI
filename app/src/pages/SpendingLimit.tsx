import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { PublicKey } from '@solana/web3.js'
import Toast from '@/components/Toast';
import { useFormik } from 'formik';
import * as yup from 'yup';

type SpendingLimit = {
  multisig: string,
  createKey: PublicKey,
  vaultIndex: number,
  mint: string,
  amount: BigInt,
  period: number,
  remainingAmount: BigInt
};

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

function SpendingLimit() {
  const [ splMint, setSplMint] = useState()
  const [ mintDecimals, setMintDecimals] = useState<number | null>()
  const [ selectedValue, setSelectedvalue] = useState<string>()
  const [ primaryKey, setPrimaryKey] = useState<string>()
  const [ period, setPeriod] = useState<any>()
  const [ amount, setAmount] = useState<string>()
  const [ spendingLimit, setSpendingLimit] = useState<any>()
  const [ spendingLimitInput, setSpendingLimitInput] = useState<any>()
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);
  const [signature, setSignature] = useState<string>("");

  useEffect(() => {
    let pda = localStorage.getItem('spendinglimit')
    let payload = {
     spendingLimitPda: pda
    };
  
    (async ()=> {
      try {
        const response = await fetch('/api/getSpendingLimit', {
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
        if(data){
          setSpendingLimit(data.data);
          console.log(data.data)
        }

      } catch (error) {
        console.error('Error:', error);
      }
     })();
  },[])


  const removeSpendingLimits = () => {
    let payload = {
      spendingLimitPda: ""
     };

    (async ()=> {
      try {
        const response = await fetch('/api/removeSpendingLimit', {
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
        if(data){
          setSpendingLimit(data.data);
          
        }
        
        
  
      } catch (error) {
        console.error('Error:', error);
      }
     })();
  }

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000); // Automatically hide the toast after 3 seconds
  };

  const handleSpendlimit =  () => {
    const multisigPda = localStorage.getItem('multisig');
    const keys = localStorage.getItem('privateKeys')
    
    if(multisigPda && keys){

    const mintDecimals = "So11111111111111111111111111111111111111112" ? 6 : 9;

    const payload = {
      multisigPda: multisigPda,
      keys: primaryKey, // Replace with the actual value for 'keys'
      splMint: selectedValue,
      mintDecimals: mintDecimals,
      time: period,
      amount: parseFloat(spendingLimitInput)
    };
    console.log(payload);
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
        setToastMessage("Failed to set spending limit")
        setToastType(ToastType.ERROR)
        showToastMessage()
      }

      const data = await response.json();
      if(data) {
        localStorage.setItem('spendinglimit', data.pda)
        setToastMessage("Spending Limit set: "+ data.signature)
        setSignature(data.signature)
        setToastType(ToastType.SUCCESS)
        showToastMessage()
      }

    } catch (error) {
      console.error('Error:', error);
    }
   })();
  }
  }




  const handleTokenChange = (e: any) => {
    setSelectedvalue(e.target.value);
    console.log(selectedValue)
  };

  const handlePeriodChange = (e: any) => {
    setPeriod(e.target.value);
    console.log(selectedValue)
  };

  const handleSpendingLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSpendingLimitInput(inputValue);
    
  };

  const primaryKeyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPrimaryKey(inputValue);
    console.log(inputValue);
  };

  

  const formatMintPubkey = (mint: string) => {
    if(mint == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"){
      return "USDC"
    }

    if(mint == "So11111111111111111111111111111111111111112"){
      return "SOL"
    }

    return mint
  }


  return (
    <div className='w-[100%] h-[100%] pb-8 flex flex-col items-center justify-center'>
         {showToast && (
          <a
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} // Replace with the appropriate property that contains the transaction signature
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Recommended for security reasons
        >
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
        </a>
      )}
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
          value={period}
          onChange={handlePeriodChange}
          >
        <option value="">How long should the spending limit last</option>
        <option value="OneTime">One Time</option>
        <option value="1">Daily</option>
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
          onChange={(e) => {
            handleSpendingLimit(e);
          }}
          placeholder='e.g 100 (USDC)'
          />
          </div>
          
          
         
          </div>

          <h1 className='text-black mt-8 font-mono'>Primary Key needed for 2FA</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <input 
          className='font-mono w-[100%] bg-[#292929] outline-none'
          placeholder='Private key signature for 2FA'
          onChange={(e) => {
            primaryKeyInput(e);
          }}
          />
          </div>
          
          <button onClick={handleSpendlimit} className='font-mono rounded-md bg-white h-[100%] border-[3px] border-[#292929] w-[45%] text-black px-3'>Set Limit</button>
         
          </div>

         </div>

         </div>

         <div className='w-[50%] '>
          <div className='flex justify-start flex-col text-left w-[100%] '>
          <h3 className='font-mono mt-6 text-2xl'>Your current limits</h3>
          <div className='bg-white rounded-xl p-4 text-black'>
           <h3 className='font-mono'>Token: {formatMintPubkey(spendingLimit?.mint)}</h3>
           <h3 className='font-mono'>Amount: {spendingLimit?.amount}</h3>
           <h3 className='font-mono'>Period: {spendingLimit?.period}</h3>
           <h3 className='font-mono'>Spendable Balance: {spendingLimit?.remainingAmount}</h3>
           <div className='flex flex-row justify-end mt-2 w-[100%]'><button onClick={removeSpendingLimits} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Remove Limit</button></div>
     
          </div>
          </div>
          
         </div>
    </div>
  )
}

export default SpendingLimit