// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { encrypt, fetchMultisigAccount, createMultisig } from '@lunchboxfi/sdk/lib'
import { Keypair } from '@solana/web3.js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import bs58 from 'bs58'
import { type } from 'os'

type Data = {
  name: any
}

type Error = {
    error: any
  }

type Encrypt = {
//   key: string;
  data: any
}
const supabase = createClientComponentClient()

function generateRandom16DigitNumber() {
    const prefix = "1685";
    const remainingDigits = 16 - prefix.length;
  
    let randomDigits = "";
  
    for (let i = 0; i < remainingDigits; i++) {
      const randomDigit = Math.floor(Math.random() * 10);
      randomDigits += randomDigit;
    }
  
    const randomNumber = prefix + randomDigits;
    return randomNumber;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Encrypt | Error>
  ) {
    const { pin, key, multisig } = req.body;
  
    if (!pin || !key || !multisig) {
      return res.status(400).json({ error: "Missing required data" });
    }
  
    const encryptPiN = encrypt(pin, key);
    console.log(encryptPiN)
    if (!encryptPiN) {
      return res.status(500).json({ error: "Failed to encrypt PIN" });
    }
  
    const random16DigitNumber = generateRandom16DigitNumber();
    const userNonce = encryptPiN.userNonce;
  
    try {
      const { data: cards, error } = await supabase
        .from('cards')
        .insert({
          card_number: random16DigitNumber,
          protocolNonce: encryptPiN.protocolNonce,
          aes_encrypted_key: encryptPiN.value,
          multisigPda: multisig
        });
      console.log(error)
      if (error != null) {
        return res.status(500).json({ error: "Failed to insert card into the database" });
      }
  
      return res.status(200).json({ data: { card: random16DigitNumber, userNonce } });
    } catch (error) {
      console.error("Error inserting card:", error);
      return res.status(500).json({ error: "An error occurred while processing the request" });
    }
  }