import React, { useEffect, useRef, useState } from 'react';
import {
  PublicKey,
  Connection,
  clusterApiUrl
} from '@solana/web3.js';
import * as multisig from '@sqds/multisig';

type Props = {}

const Receive = ({}: Props) => {
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
        Receive
        <div className='bg-black text-white rounded-md p-3'>
          <span>{vaultPda}</span>
        </div>
      </div>
    </div>
  );
};

export default Receive;
