import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig, addSpendingLimit } from '@lunchboxfinance/sdk/lib'
import { Keypair, TransactionMessage, Connection, clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, VersionedTransaction } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import * as multisig from '@sqds/multisig'
import bs58 from 'bs58'
import { type } from 'os'
import { Member } from '@sqds/multisig/lib/generated'

const { Period } = multisig.types;
const { SpendingLimit } = multisig.accounts

type Data = {
  data: any,
}


type SpendingLimit = {
  multisig: PublicKey,
  createKey: PublicKey,
  vaultIndex: number,
  mint: PublicKey,
  amount: BigInt,
  period: number,
  remainingAmount: BigInt
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
  res: NextApiResponse
) {
    const { spendingLimitPda } = req.body


    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const solSpendingLimitPda = new PublicKey(spendingLimitPda)
    const solSpendingLimitAccount = await SpendingLimit.fromAccountAddress(
        connection,
        solSpendingLimitPda
      );
    console.log(solSpendingLimitAccount)

    res.status(300).json({ data: solSpendingLimitAccount })
}