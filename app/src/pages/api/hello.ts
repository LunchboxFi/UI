// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt } from '@lunchboxfi/sdk/lib'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let privatekey : any = Keypair.generate().secretKey
  privatekey = bs58.encode(privatekey)
  console.log(privatekey)
   const PIN = 5546
  const en = encrypt(PIN, privatekey)
  console.log(en)
  res.status(200).json({ name: `${en}` })
}
