import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig, addSpendingLimit } from '@lunchboxfi/sdk/lib'
import { Keypair, TransactionMessage, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as multisig from '@sqds/multisig'
import bs58 from 'bs58'
import { type } from 'os'
import { Member } from '@sqds/multisig/lib/generated'

const { Period } = multisig.types;

type Data = {
  name: string
}

interface Mutisig  {
  multisig: string | undefined;
  keypairs: Keypair[] | undefined;
  signature: any;
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
  res: NextApiResponse<Mutisig>
) {
  
  const { spendingLimitPda } = req.body

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

  const multisigPubkey = new PublicKey("2TKe6JynkcgB5VZEtmdFLW4LGsSHgNWygpfurBuHF7L1")

  
    // let { data: advkeys, error } = await supabase
    // .from('adv')
    // .select('advisor_privateKey')
    // .eq("multisigPda", multisigPda)

     if(multisigPubkey){
      // const secondaryarray = bs58.decode(keys);
      // const advisor_array = bs58.decode(advkeys[0]?.advisor_privateKey);

      // const secondaryKey = loadWalletKeypair(secondaryarray);
      // const advisor_key = loadWalletKeypair(advisor_array);

      const feePayer = loadWalletKeypair(bs58.decode("3JccbErBtmnKJpSonGP1Qhfu61RuzWhBjSi8Xb4XjwG5p4FwPLw7eDh1y5RXLtP9CbDJ9MeQH8a1EMVFhmcCYdUy"))
      let members: Members

      console.log("fee" + feePayer.publicKey)

      const spendingLimitCreateKey = Keypair.generate().publicKey;
  

    const spendingLimitPubkey = new PublicKey(spendingLimitPda)
     console.log(multisigPubkey)
     let signature = await multisig.rpc.multisigRemoveSpendingLimit({
        connection,
        multisigPda: multisigPubkey,
        spendingLimit: spendingLimitPubkey,
        configAuthority: feePayer.publicKey,
        feePayer: feePayer,
        rentCollector: feePayer.publicKey,
     });
      console.log('Spending limit removed successfully.' + signature)

     }
  
}