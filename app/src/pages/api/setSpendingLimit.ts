import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig, addSpendingLimit } from '@lunchboxfinance/sdk/lib'
import { Keypair, TransactionMessage, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { BN } from '@coral-xyz/anchor'
import * as multisig from '@sqds/multisig'
import bs58 from 'bs58'
import { type } from 'os'
import { Member } from '@sqds/multisig/lib/generated'

const { Period } = multisig.types;

type Data = {
    signature: string
    pda: string
}

type Error = {
  data: string
}

enum PeriodEnum {
  OneTime,
  Day,
  Week,
  Month,
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
  res: NextApiResponse<Data| Error>
) {

  const { multisigPda, keys, splMint, amount, mintDecimals, time } = req.body

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

  // console.log({
  //   multisigPda, keys, splMint, amount, mintDecimals, time
  // })
  const multisigPubkey = new PublicKey(multisigPda)

  const multisigAccount = await multisig.accounts.accountProviders.Multisig.fromAccountAddress(
    connection,
    multisigPubkey
  );
  const token = new PublicKey(splMint)

  
 

  
    let { data: advkeys, error } = await supabase
    .from('adv')
    .select('advisor_privateKey')
    .eq("multisigPda", multisigPda)

     if(advkeys && time){
      const secondaryarray = bs58.decode(keys);
      const advisor_array = bs58.decode(advkeys[0]?.advisor_privateKey);

      const secondaryKey = loadWalletKeypair(secondaryarray);
      const advisor_key = loadWalletKeypair(advisor_array);



      const feePayer = loadWalletKeypair(bs58.decode(keys))
      

      console.log(feePayer)

      const spendingLimitCreateKey = Keypair.generate().publicKey;
  
    const spendingLimitPda = multisig.getSpendingLimitPda({
      multisigPda: multisigPubkey,
      createKey: spendingLimitCreateKey,
    })[0];

    const spendingLimit = spendingLimitPda.toBase58()

    let bn = new BN(amount)
    console.log(time)

    let selectedPeriod = Period.OneTime;
    
    if (time === 'Week') {
       selectedPeriod = Period.Week;
    } else if(time === 'Day') {
       selectedPeriod = Period.Day;
    } else if(time === 'Month') {
      selectedPeriod = Period.Month;
    } else if(time === 'OneTime') {
      selectedPeriod = Period.OneTime;
    }
    console.log(selectedPeriod)
    
     let signature = await multisig.rpc.multisigAddSpendingLimit({
        connection,
        feePayer,
        // The multisig account Public Key
        multisigPda: multisigPubkey,
        // The spending limit account Public Key
        spendingLimit: spendingLimitPda,
        createKey: spendingLimitCreateKey,
        // Rent payer for state
        rentPayer: feePayer,
        // Spending limit amount
        amount: amount,
        configAuthority: multisigAccount.configAuthority,
        // Spending limit will apply daily, see reference for more info
        period: selectedPeriod,
        // The mint of the token to apply the spending limit on
        mint: token,
        destinations: [],
        // null means it will apply to all members, make it an array of Public Keys to specify certain members
        members: [],
        vaultIndex: 1,
      });
      console.log('Spending limit added successfully.' + signature)

      if (signature) {
        res.status(200).json({  signature, pda: spendingLimit  });
      } else {
        res.status(500).json({ data: "Failed to add spending limit" });
      }
     }
  
}
