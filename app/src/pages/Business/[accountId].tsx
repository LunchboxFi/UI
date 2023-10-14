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

  const router = useRouter();
  const { accountId } = router.query;

  useEffect(() => {
    if(accountId) {
      const apiUrl = `/api/getBalance?vaultPda=${accountId}`;
      console.log(accountId)
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
              console.log(balance)
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    } 

    
  },[accountId])


  
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
      </div>
      

      <div className='mt-3'></div>
      <div  className='font-mono mt-3 text-black'>Transaction History</div>

    
     
         </div>
         </div>
    </div>
  )
}

export default index