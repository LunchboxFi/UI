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

  return (
    <div className='w-[100%] flex justify-center'>
      <div className='w-[50%] font-mono text-black rounded-xl p-5 bg-white'>
        Send tokens
        <div className='bg-black text-white flex mt-3 items-center gap-3 rounded-2xl p-3'>
        <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg"
             className='bg-white h-[40px] w-[40px] rounded-full' />
          <span>Solana</span>
        </div>

        <div className='bg-black mt-4 text-white flex items-center gap-3 rounded-2xl p-3'>
        <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/usdc.svg"
             className='bg-white h-[40px] w-[40px] rounded-full' />
          <span>USDC</span>
        </div>
      </div>
    </div>
  );
};

export default Send;