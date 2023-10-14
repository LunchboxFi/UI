import React, { useEffect, useState } from 'react'
import * as multisig from '@sqds/multisig'
import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import axios from 'axios'

type Props = {}

interface BalanceRes {
  data: { data: {
     tokens: [],
     nativeBalance: number
  }
 }
}


function index({}: Props) {
  const [ balance, setBalance ] = useState<number | null>();
  const [transactions, setTransactions] = useState<[] | null>();

  const router = useRouter();
  const { accountId } = router.query;

  useEffect(() => {
    if(accountId) {
      const apiUrl = `/api/getBalance?vaultPda=${accountId}`;
      // Fetch data from the API
      if (accountId) {
        // Use Axios to fetch data
        console.log(accountId)
        axios.get(apiUrl)
          .then((response: BalanceRes) => {
            // Handle the response data here
            if(response){
              const balance = response.data.data.nativeBalance / LAMPORTS_PER_SOL
              setBalance(balance)

            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    } 

    
  },[accountId])

  useEffect(() => {
    if (accountId) {
      const apiUrl = `/api/getTransaction?vaultPda=${accountId}`;
      console.log(accountId);
      // Fetch data from the API
      if (accountId) {
        // Use Axios to fetch data
        console.log(accountId);
        axios.get(apiUrl)
          .then((response) => {
            // Handle the response data here
            if (response) {
              setTransactions(response.data.data);
              console.log("Transaction", response.data.data);
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    }
  }, [accountId]);

  
  
  
  
  
  


  
  return (
    <div className='w-[100%] font-mono h-[100%] flex flex-col items-center justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white text-black rounded-xl p-5 h-[100%] w-[100%]'>
         <h1 className='font-mono'>Account Information</h1>
         <h3 className='font-mono mt-6'>Address:{accountId}</h3>
      <div className='mt-3'></div>
      <div  className='font-mono mt-3'>Balance:</div>

      <div>
      <div className='bg-black text-white flex mt-3 items-center gap-3 rounded-2xl p-3'>
        <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg"
             className='bg-white h-[40px] w-[40px] rounded-full' />
          <span>Solana</span>
          <div className='flex flex-grow justify-end'>
          <span>Balance: {balance} </span>
          </div>
        </div>

        <div className='bg-black mt-4 text-white flex items-center gap-3 rounded-2xl p-3'>
        <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg"
             className='bg-white h-[40px] w-[40px] rounded-full' />
          <span>USDC</span>
          <div className='flex flex-grow justify-end'>
          <span>Balance: 0 </span>
          </div>
        </div>
      </div>
      

      <div className='mt-3'></div>
      <div  className='font-mono mt-3 text-black'>Transaction History</div>
      {transactions && Array.isArray(transactions) && transactions.length > 0 ? (
  transactions.map((item: any, key: number) => (
    <a
      key={key}
      href={`https://explorer.solana.com/tx/${item.signature}?cluster=devnet`} // Replace with the appropriate property that contains the transaction signature
      target="_blank" // Open link in a new tab
      rel="noopener noreferrer" // Recommended for security reasons
      className='text-white px-4 max-h-20 py-3 rounded-2xl bg-[#111111] font-main flex font-medium'
    >
      <div>
        <span>{item.type}</span>
        <h1 className='text-sm font-mono'>From: {item.nativeTransfers[0].fromUserAccount.slice(0,18)}...{item.nativeTransfers[0].fromUserAccount.slice(26)}</h1>
      </div>
      <div className='flex flex-grow justify-end'>
        <span>{(item.nativeTransfers[0].amount / LAMPORTS_PER_SOL).toFixed(4)}</span>
      </div>
    </a>
  ))
) : (
  <div className='text-black px-4 max-h-20 py-3 rounded-2xl font-main flex font-medium'>
    <div>
      <span>No transaction history</span>
    </div>
  </div>
)}
    
     
         </div>
         </div>
    </div>
  )
}

export default index