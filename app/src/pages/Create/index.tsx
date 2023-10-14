import React, { useEffect, useState} from 'react'
import { Keypair } from '@solana/web3.js'
import ClipboardCopy from '@/components/Clipboard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Oval } from 'react-loader-spinner';
import { useRouter } from 'next/navigation';
import bs58 from 'bs58'

interface Multisig  {
  multisig: string | undefined;
  keypairs: Keypair[] | undefined;
  signature: any;
}

const supabase = createClientComponentClient()

function Index() {
  const [data, setData] = useState<Multisig>();
  const [loader, setLoader] = useState<boolean>(false)
  const [primaryPubKey, setPrimaryPubKey] = useState<any>();
  const [primaryPrivateKey, setPrimaryPrivateKey] = useState<string | undefined>();
  const [secondaryPubKey, setSecondaryPubKey] = useState<string | undefined>();
  const [secondaryPrivateKey, setSecondaryPrivateKey] = useState<string | undefined>();
  const [advisoryPubKey, setAdvisoryPubKey] = useState<string | undefined>();
  const [advisoryPrivateKey, setAdvisoryPrivateKey] = useState<string | undefined>();

  const router = useRouter()

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = '/api/createMultisig';

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseData) => {
        // Update the state with the fetched data
        setData(responseData);
        if(data) {
          setPrimaryPubKey(data?.keypairs?.[0].publicKey)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const multisigPda = data?.multisig

  let primary = data?.keypairs?.[0].publicKey
  
  useEffect(() => {
    // Access the publicKey and privateKey after data has been updated
    if (data?.keypairs) {
      const keypairs: Keypair[] = data.keypairs.map((keypairData: any) => {
        const publicKeyBytes = keypairData._keypair.publicKey;
        const privateKeyBytes = keypairData._keypair.secretKey;
        
        // Convert the bytes arrays to Uint8Arrays
        const publicKey = new Uint8Array(Object.values(publicKeyBytes));
        const privateKey = new Uint8Array(Object.values(privateKeyBytes));

        // Create Keypair instances
        const keypair = Keypair.fromSecretKey(privateKey);

        return keypair;
      });

      // Now, keypairs is an array of Keypair instances
      setPrimaryPubKey(keypairs[0].publicKey.toBase58());
      setSecondaryPubKey(keypairs[1].publicKey.toBase58());
      setAdvisoryPubKey(keypairs[2].publicKey.toBase58());
      setPrimaryPrivateKey(bs58.encode(keypairs[0].secretKey))
      setSecondaryPrivateKey(bs58.encode(keypairs[1].secretKey))
      setAdvisoryPrivateKey(bs58.encode(keypairs[2].secretKey))
    }
  }, [data]);

  const Loader = () => {
   return ( <Oval
  height={30}
  width={30}
  color="#000000"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="#000000"
  strokeWidth={2}
  strokeWidthSecondary={2}

/> )
  }

  async function handleSave() {

     setLoader(true)
     const pda: string | any = multisigPda
     console.log(pda)
     const { data, error } = await supabase
     .from('adv')
     .insert([
      { 
        advisor_privateKey: advisoryPrivateKey,
        multisigPda: pda
      },
      ])
    
    const saveToLocalStorage = () => {
      const privateKey: string | any = secondaryPrivateKey;
      const pda: string | any = multisigPda
      localStorage.setItem('privateKeys', privateKey);
      localStorage.setItem('multisig', pda);
    };

    saveToLocalStorage()

    setLoader(false);

    router.push('Dashboard')
    }


  return (
    <div className='w-[100%] h-[100%] px-[4rem]'>
        <div className=' border-[#ffffff50] border-[3px] h-[88vh] p-6 rounded-2xl'>
            <h1 className='font-sans font-normal text-3xl'>Create your lunchbox in a few steps</h1>
            <p className='font-mono mt-3'>Your wallet with the security of web 3 and experience and feel of Web 2</p>
            <div className='h-[100%] flex items-center p-5'>
            <div className='h-[80%] w-[50%] pr-5'>
             <h1 className='font-mono text-4xl'>Create your Lunchbox</h1>
             <p className='font-mono mt-4 font-normal text-[#d4d4d4]'>{`A lunchbox contains 3 wallets as members, 2 members votes are required to execute any transaction. But 
              the primary wallet has the permission to remove any member that includes the protocol advisor and the secondary wallet if you feel it has been compromised. You can also
              implement account lock by stoping us from signing transactions. We also won't sign certain suspicious transactions without a minimum timelock but don't worry you can override it using your private key.`}
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
                <span className='font-mono flex flex-row'>{primaryPubKey}</span>
                </div>
                <div className='w-[45%] h-[100%]'>
                <ClipboardCopy textToCopy={`${primaryPrivateKey}`} buttonText='Copy Private Key' />
                </div> 
              </div>

              <h3 className='font-mono mt-6'>Secondary address</h3>
              <h1 className='font-mono font-normal'>This is the wallet you use to sign regular day to day transaction</h1>
              <div className='bg-[#292929] h-10 flex items-center justify-center overflow-hidden rounded-md'>
                <div className='overflow-hidden'>
                <span className='font-mono flex flex-row'>{secondaryPubKey}</span>
                </div>
              </div>

              <h3 className='font-mono mt-6'>Advisory address</h3>
              <h1 className='font-mono font-normal'>This is the protocol adivisory wallet on your multisig it helps the protocol advise you and provide services like account lock and card lock, including providing
                OTPs for suspicious transactions to make sure only you decide how to spend your crypto.
              </h1>
              <div className='bg-[#292929] h-10 flex items-center justify-center overflow-hidden rounded-md'>
                <div className='overflow-hidden'>
                <span className='font-mono flex flex-row'>{advisoryPubKey}</span>
                </div>
              </div>

             </div>
             <div className='w-[100%] mt-4 flex justify-end'>
             <button onClick={handleSave} className='font-mono rounded-md bg-white h-10 text-black px-3'>
             {loader ? <Loader /> : 'Create Lunchbox'}
             </button>
             </div>
            </div>
         </div>
        </div>
        
        
    </div>
  )
}

export default Index