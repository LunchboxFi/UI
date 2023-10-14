import React, { useEffect, useRef, useState } from 'react';
import {
  PublicKey,
  Connection,
  clusterApiUrl
} from '@solana/web3.js';
import * as multisig from '@sqds/multisig';

type Props = {}

const Send = ({}: Props) => {
    const [multisigPda, setMultsigPda] = useState<PublicKey | undefined>();
    const [vaultPda, setVaultPda] = useState<string | null>();
    
  
   

  useEffect(() => {
    const pda = localStorage.getItem('multisig');
    if (pda !== null) {
      const multisigAddress = new PublicKey(pda);
      setMultsigPda(multisigAddress);
    }
  }, []);

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
        placeholder={"0"}
        // value={inputValue}
        // onChange={handleInputChange}
        className='text-center w-[50%] font-main font-semibold outline-none text-purple-800 items-center py-auto text-[6rem]'
      />
       <span className='text-purple-800 font-medium text-xl'>SOL</span>
        </div>

        <div className='bg-black mt-4 text-white flex items-center gap-3 rounded-2xl p-3'>
        <input 
        placeholder='Paste Receivers address'
        className='w-[100%] bg-black text-white'
        />
        </div>

        <button className='bg-purple-800 font-mono mt-4 w-[100%] text-white flex justify-center items-center gap-3 rounded-2xl p-3'>
        Send 500 SOL
        </button>
      </div>
    </div>
  );
};

export default Send;