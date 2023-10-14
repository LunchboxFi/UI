import type { NextApiRequest, NextApiResponse } from 'next'
import { transferSOL } from '@lunchboxfinance/sdk/lib'
import { Keypair, TransactionMessage, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as multisig from '@sqds/multisig'
import bs58 from 'bs58'
import { type } from 'os'
import { Member } from '@sqds/multisig/lib/generated'

const { Period } = multisig.types;

type Data = {
  data: string
}



type Members = {
  secondary: Keypair;
  advisor: Keypair;
};

export function loadWalletKeypair(keypairFile: any): Keypair {
  const loaded = Keypair.fromSecretKey(
    new Uint8Array(keypairFile)
  );
  return loaded;
}

const supabase = createClientComponentClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { multisigPda, keys, to, amount } = req.body

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

  const multisigPubkey = new PublicKey(multisigPda)

  const receiver = new PublicKey(to)

  const multisigAccount = await multisig.accounts.accountProviders.Multisig.fromAccountAddress(
    connection,
    multisigPubkey
  );
  console.log(multisigAccount)

  const transactionIndex = multisig.utils.toBigInt(
    multisigAccount.transactionIndex
  ) + 1n;

  
    let { data: advInfo, error } = await supabase
    .from('adv')
    .select('advisor_privateKey, locked')
    .eq("multisigPda", multisigPda)
    
    if(advInfo){

    if (advInfo[0]?.locked){
      console.log("Account is locked")
      res.status(500).json({ data: "Account is locked"})
    } else {
      
      const secondaryarray = bs58.decode(keys);
      const advisor_array = bs58.decode(advInfo[0]?.advisor_privateKey);
      
      const secondaryKey = loadWalletKeypair(secondaryarray);
      const advisor_key = loadWalletKeypair(advisor_array);
      const signers = [ secondaryKey, advisor_key]
      
      const signature = await transferSOL("devnet", secondaryKey, receiver, multisigPubkey, amount, signers )
      
      if (signature) {
        console.log(signature);
        res.status(200).json({ data: signature });
      } else {
        res.status(500).json({ data: "Transaction failed" });
      }
    }
    
  }
   
    res.status(500).json({ data: "Something went wrong" })
}