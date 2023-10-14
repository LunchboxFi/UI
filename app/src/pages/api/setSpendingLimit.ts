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

  const { multisigPda, keys, splMint, mintDecimals } = req.body

  const connection = new Connection(clusterApiUrl("devnet"), "confirmed")

  const multisigPubkey = new PublicKey(multisigPda)

  const multisigAccount = await multisig.accounts.accountProviders.Multisig.fromAccountAddress(
    connection,
    multisigPubkey
  );

  console.log(multisigAccount)
  const token = new PublicKey(splMint)

  const transactionIndex = multisig.utils.toBigInt(
    multisigAccount.transactionIndex
  ) + 1n;

  
    let { data: advkeys, error } = await supabase
    .from('adv')
    .select('advisor_privateKey')
    .eq("multisigPda", multisigPda)

     if(advkeys){
      const secondaryarray = bs58.decode(keys);
      const advisor_array = bs58.decode(advkeys[0]?.advisor_privateKey);

      const secondaryKey = loadWalletKeypair(secondaryarray);
      const advisor_key = loadWalletKeypair(advisor_array);

      const feePayer = loadWalletKeypair(bs58.decode("3JccbErBtmnKJpSonGP1Qhfu61RuzWhBjSi8Xb4XjwG5p4FwPLw7eDh1y5RXLtP9CbDJ9MeQH8a1EMVFhmcCYdUy"))
      let members: Members

      console.log("fee" + feePayer.publicKey)

      const spendingLimitCreateKey = Keypair.generate().publicKey;
  
    const spendingLimitPda = multisig.getSpendingLimitPda({
      multisigPda: multisigPubkey,
      createKey: spendingLimitCreateKey,
    })[0];
    console.log("SpendingLimit: " + spendingLimitPda)
  
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
        amount: 1n,
        configAuthority: multisigAccount.configAuthority,
        // Spending limit will apply daily, see reference for more info
        period: Period.Day,
        // The mint of the token to apply the spending limit on
        mint: token,
        destinations: [],
        // null means it will apply to all members, make it an array of Public Keys to specify certain members
        members: [],
        vaultIndex: 1,
      });
      console.log('Spending limit added successfully.' + signature)

     }
  
}
