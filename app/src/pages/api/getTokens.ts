// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig } from '@lunchboxfinance/sdk/lib'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'
import { type } from 'os'

type Data = {
  tokens: Object
}

type Error = {
    error: string
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
    try {

         // Get the query parameter from the request
        const { vaultPda } = req.query;

        if (!vaultPda) {
        // Handle the case where vaultPda is missing or undefined
        return res.status(400).json({ error: 'vaultPda parameter is missing' });
        }

        const url = `https://api-devnet.helius.xyz/v0/addresses/${vaultPda}/balances?api-key=d7e73515-c3a0-4f6c-a8a9-88306b028fbf`;

        const response = await fetch(
          url,
          {
            method: req.method,
            headers: {
              'Content-Type': 'application/json',
              // You can add any other headers needed
            },
          }
        );
        const data = await response.json();
        res.status(200).json({ tokens: data.tokens })
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}