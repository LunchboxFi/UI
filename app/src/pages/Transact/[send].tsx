import React, { MouseEventHandler, useEffect, useState } from 'react';
import {
  PublicKey,
  Connection,
  clusterApiUrl
} from '@solana/web3.js';
import * as multisig from '@sqds/multisig';
import { useRouter } from 'next/router';
import { ColorRing } from  'react-loader-spinner'

type Props = {}

const Send = ({}: Props) => {
  const [multisigPda, setMultsigPda] = useState<PublicKey | undefined>();
  const [pda, setPda] = useState<string | null>();
  const [vaultPda, setVaultPda] = useState<string | null>();
  const [amount, setAmount] = useState<number>(0); 
  const [recepient, setRecepient] = useState<string>("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  let symbol = "";
  if (router.query && router.query.symbol) {
    symbol = router.query.symbol as string;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    const parsedValue = parseFloat(inputValue);
    setAmount(isNaN(parsedValue) ? 0 : parsedValue);
  };

  const handleRecepient = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setRecepient(inputValue);
  };

  

  const sendSol: MouseEventHandler<HTMLButtonElement> = (
    event: { preventDefault: () => void }
  ) => {
    event.preventDefault();
  
    setLoading(true);
  
    const key = localStorage.getItem("privateKeys");
    const payload = {
      amount: amount,
      to: recepient,
      multisigPda: pda,
      keys: key,
    };
  
    // Perform any asynchronous actions here
    (async () => {
      try {
        const response = await fetch('/api/transfer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          
        }
  
        const data = await response.json();
        
        if(response.ok){
          const signature = data?.data
          const url = `/Success?receiver=${recepient}&amount=${amount}${symbol}&signature=${signature}`;
          router.replace(url);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false); // Set loading to false after the async operation is complete
      }
    })();
  };
  

  const handle = (Route: string): MouseEventHandler<HTMLButtonElement> => (
    event: { preventDefault: () => void; }
  ) => {
    event.preventDefault();
    router.push(Route);
  };

  useEffect(() => {
    const pda = localStorage.getItem('multisig');
    setPda(pda)
    if (pda !== null) {
      const multisigAddress = new PublicKey(pda);
      setMultsigPda(multisigAddress);
    }
  }, [symbol]);

  useEffect(() => {
    if (multisigPda !== undefined) {
      const [vaultPdaResult] = multisig.getVaultPda({
        multisigPda: multisigPda,
        index: 1,
      });
      setVaultPda(vaultPdaResult.toBase58());
      console.log("Vault" + vaultPdaResult.toBase58());
    }
  }, [multisigPda]);

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const fixedValue = 'sol';

  return (
    <div className='w-[100%] flex justify-center'>
      <div className='w-[50%] font-mono text-black rounded-xl p-5 bg-white'>
        Send tokens
        <div className='bg-white text-white flex mt-3 justify-center items-center gap-3 rounded-2xl p-3'>
        <input
  type="number"
  step="0.01"
  placeholder={"0"}
  onChange={(e) => {
    console.log('Input event:', e.target.value);
    handleInputChange(e);
  }}
  value={amount}
  className='text-center w-[50%] font-main font-semibold outline-none text-purple-800 items-center py-auto text-[6rem]'
/>
          <span className='text-purple-800 font-medium text-xl'>{symbol}</span>
        </div>

        <div className='bg-black mt-4 text-white flex items-center gap-3 rounded-2xl p-3'>
          <input
            placeholder='Paste Receiver&apos;s address'
            onChange={(e) => {handleRecepient(e)}}
            className='w-[100%] focus:outline-none  bg-black text-white'
          />
        </div>
        
        <button onClick={sendSol} className='bg-purple-800 font-mono mt-4 w-[100%] text-white flex justify-center items-center gap-3 rounded-2xl py-1 px-3'>
        {loading ?
            <ColorRing
            visible={true}
            height="40"
            width="40"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
          /> 
             : 
             <span className='my-2'>Send {amount} {symbol}</span>
           }
        </button>
      </div>
    </div>
  );
};

export default Send;


