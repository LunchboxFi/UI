// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig } from '@lunchboxfinance/sdk/lib'
import { Keypair } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import bs58 from 'bs58'
import { type } from 'os'

type Data = {
  name: any
}

type Mutisig = {
  multisig: string;
  keypairs: Keypair[];
  signature: any;
}

const supabase = createClientComponentClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { mutisigPda } = req.query as { mutisigPda: string };

    (async() => {
        let { data: cards, error } = await supabase
        .from('cards')
        .select('*')
        .eq("multisigPda", mutisigPda)
         console.log(cards)
         res.status(200).json({ name: cards })
    })()
}