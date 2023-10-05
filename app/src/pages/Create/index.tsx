import React, { useEffect} from 'react'
import { encrypt } from '@lunchboxfi/sdk/cards/encrypt'
import { Keypair } from '@solana/web3.js'
import bs58 from 'bs58'


function index() {

  useEffect(() => {
    const PIN = 5676;
    let privateKey: Uint8Array | any = Keypair.generate().secretKey;
    privateKey = bs58.encode(privateKey);
    console.log(privateKey);
    const encryptedValue = encrypt(PIN, privateKey);
    console.log(encryptedValue);

    // You can perform any additional actions with encryptedValue here

    // Make sure to clean up any resources if necessary
    return () => {
      // Cleanup code here (if needed)
    };
  }, []);
  
  return (
    <div className='w-[100%] h-[100%] px-[4rem]'>
        <div className=' border-[#ffffff50] border-[3px] h-[88vh] p-6 rounded-2xl'>
            <h1 className='font-sans font-normal text-3xl'>Create your lunchbox in a few steps</h1>
            <p className='font-mono mt-3'>Your wallet with the security of web 3 and experience and feel of Web 2</p>
            <div className='h-[100%] flex items-center p-5'>
            <div className='h-[80%] w-[50%] pr-5'>
             <h1 className='font-mono text-4xl'>Create your Lunchbox</h1>
             <p className='font-mono mt-4 font-normal text-[#d4d4d4]'>A lunchbox contains 3 wallets as members, 2 members votes are required to execute any transaction. But 
              the primary wallet has the permission to remove any member that includes the protocol advisor and the secondary wallet if you feel it has been compromised. You can also
              implement account lock by stoping us from signing transactions. We also won't sign certain suspicious transactions without a minimum timelock but don't worry you can override it using your private key.
             </p>
            </div>
            <div className='h-[80%] overflow-y-auto p-5 font-bold w-[50%] rounded-2xl bg-[#292929]'>
             <h1 className='text-2xl font-mono'>Generate the Multisig Member wallet</h1>
             <div className='h-[1px] mt-2 bg-[#969696]'>
             </div>
             <div className=' rounded-2xl p-4 mt-4 w-[100%] bg-[#4d4d4d]'>
              <h3 className='font-mono'>Primary address</h3>
              <h1 className='font-mono font-normal'>This is your most important wallet it is used only for secure 2FA verification</h1>
              <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
                <div className=' pl-4 overflow-hidden'>
                <span className='font-mono flex flex-row'>8Hs2MzJAuWXt57LKcTsYQaRCZyNUeuyuGHrfAzYQSLDv</span>
                </div>
                <button className='font-mono bg-white h-[100%] w-[45%] text-black px-3'>Copy Private Key</button>
              </div>

              <h3 className='font-mono mt-6'>Secondary address</h3>
              <h1 className='font-mono font-normal'>This is the wallet you use to sign regular day to day transaction</h1>
              <div className='bg-[#292929] h-10 flex items-center justify-center overflow-hidden rounded-md'>
                <div className='overflow-hidden'>
                <span className='font-mono flex flex-row'>8Hs2MzJAuWXt57LKcTsYQaRCZyNUeuyuGHrfAzYQSLDv</span>
                </div>
              </div>

              <h3 className='font-mono mt-6'>Advisory address</h3>
              <h1 className='font-mono font-normal'>This is the protocol adivisory wallet on your multisig it helps the protocol advise you and provide services like account lock and card lock, including providing
                OTPs for suspicious transactions to make sure only you decide how to spend your crypto.
              </h1>
              <div className='bg-[#292929] h-10 flex items-center justify-center overflow-hidden rounded-md'>
                <div className='overflow-hidden'>
                <span className='font-mono flex flex-row'>8Hs2MzJAuWXt57LKcTsYQaRCZyNUeuyuGHrfAzYQSLDv</span>
                </div>
              </div>

             </div>
             <div className='w-[100%] mt-4 flex justify-end'>
             <button className='font-mono rounded-md bg-white h-10 text-black px-3'>Next step</button>
             </div>
            </div>
         </div>
        </div>
        
        
    </div>
  )
}

export default index