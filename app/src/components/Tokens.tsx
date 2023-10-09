import React, { useState, useEffect } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import axios from 'axios';

const Tokens = () => {
  const [tokens, setToken] = useState<[] | null>();
  
  const vaultPda = "GHwTtdFcjzZK2wThQ7pLBvmMxmy7qvNSdygfk7JE46U9"
  useEffect(() => {
    if(vaultPda) {
      const apiUrl = `/api/getTokens?vaultPda=${vaultPda}`;

      // Fetch data from the API
      console.log(vaultPda)
      if (vaultPda) {
        // Use Axios to fetch data
        axios.get(apiUrl)
          .then((response) => {
            // Handle the response data here
            if(response.data){
              console.log(response.data.tokens)
              setToken(response.data.tokens)
            }
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    } 
  },[vaultPda])

  return (
    <div>
      {tokens && tokens.map((token: any, index) => (
        <div key={index} className='bg-[#ddffe5] mt-4 flex items-center p-3 rounded-2xl h-[3.5rem] w-[100%]'>
        <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg"
         className='bg-white h-[40px] w-[40px] rounded-full' />
        
        <div className='px-4'>
            <h5 className='text-black font-mono'>USD Coin</h5>
            <h5 className='text-black font-main font-medium'>0.22</h5>
        </div>

        <div className='px-4 h-[100%] flex flex-grow items-center justify-end '>
            <h5 className='text-black font-mono'>${token.amount/ LAMPORTS_PER_SOL}</h5>
        </div>
        </div>
      ))}
    </div>
  );
};

export default Tokens;
