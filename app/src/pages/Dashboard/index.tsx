import React, {MouseEventHandler, useEffect, useState} from 'react'
import { BsSend } from 'react-icons/bs'
import { PiArrowBendLeftDownBold } from 'react-icons/pi'
import { IoMdAddCircle } from 'react-icons/io'
import { AiOutlineSwap } from 'react-icons/ai'
import * as multisig from '@sqds/multisig'
import { PublicKey, LAMPORTS_PER_SOL, Connection, clusterApiUrl } from '@solana/web3.js'
import { PriceStatus, PythConnection, PythHttpClient, getPythProgramKeyForCluster } from '@pythnetwork/client'
import axios, { AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import Tokens from '@/components/Tokens'
import Card from '@/components/Card'
import Toast from '@/components/Toast'

interface BalanceRes {
   data: { data: {
      tokens: [],
      nativeBalance: number
   }
  }
}

interface PriceRes {
  data: {
    data: any
    SOL: {
      id: string;
      mintSymbol: string;
      vsToken: string;
      vsTokenSymbol: string;
      price: number;
    };
  };
  timeTaken: number;
}

function Index() {
    const [multisigPda, setMultsigPda] = useState<PublicKey | undefined>();
    const [vaultPda, setVaultPda] = useState<string | null>();
    const [balance, setBalance] = useState<any>();
    const [solbalance, setSolBalance] = useState<any>();
    const [solprice, setSolPrice] = useState<number | null>();
    const [transaction, setTransaction] = useState<[] | null>([]);
    const [nonce, setNonce] = useState<any>();
    const [showToast, setShowToast] = useState(false);

    const showToastMessage = () => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // Automatically hide the toast after 3 seconds
    };

    const connection = new Connection(clusterApiUrl("devnet"), "confirmed")
    const router = useRouter()

    const handle = (Route: string): MouseEventHandler<HTMLButtonElement> => (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      router.push(Route);
    };
  
    useEffect(() => {
      const pda = localStorage.getItem('multisig');
      if (pda !== null) {
        const multisigAddress = new PublicKey(pda);
        setMultsigPda(multisigAddress);
      }
    }, []);


    useEffect(() => {
      if (multisigPda !== undefined) {
        const [vaultPdaResult] = multisig.getVaultPda({
          multisigPda: multisigPda,
          index: 1,
        });
        setVaultPda(vaultPdaResult.toBase58());
        console.log("Vault" + vaultPdaResult.toBase58())
      }
       
         
    }, [multisigPda]);

    useEffect(() => {
      if(vaultPda) {
        const apiUrl = `/api/getBalance?vaultPda=${vaultPda}`;

        // Fetch data from the API
        if (vaultPda) {
          // Use Axios to fetch data
          axios.get(apiUrl)
            .then((response: BalanceRes) => {
              // Handle the response data here
              if(response){
                const solbalance = response.data.data.nativeBalance / LAMPORTS_PER_SOL
                setSolBalance(solbalance)
            
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
        }
      } 
    },[vaultPda])

    useEffect(() => {
        const apiUrl = `/api/getTokenPrices`;

        // Fetch data from the API
          axios.get(apiUrl)
            .then((response: AxiosResponse<PriceRes>) => {
              // Handle the response data here
              if(response){
              setSolPrice(response.data.data.data.SOL.price)
              }
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
            });
    },[])

    useEffect(() => {
      const apiUrl = `/api/getTransaction?vaultPda=${vaultPda}`;
      
      // Fetch data from the API
      axios.get(apiUrl)
        .then((response) => {
          // Handle the response data here
          if (response) {
            setTransaction(response.data.data);
            console.log("Transaction", response.data.data); // Separate the string and the object
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [vaultPda]);
    
    
  
    
  
  return (
    <div className='w-[100%] h-[100%] grid grid-flow-row grid-cols-5 p-6'>
      
      {showToast && (
        <Toast
          message="This is a sample toast message."
          type='warning'
          onClose={() => setShowToast(false)}
        />
      )}
         <div className='bg-white h-[80vh] w-[100%] col-span-3 rounded-xl'>
         <div className='w-[100%] h-20 flex flex-row text-black'>
            <div className='w-[50%] flex border-b-[2px] border-[#1f1f1f] justify-center items-center '>
                <button className='font-mono'>Tokens</button>
            </div>
            <div className='w-[50%] flex justify-center items-center '>
                <button className='font-mono'>Collectibles</button>
            </div>
         </div>

         <div className='text-black w-[100%] h-[30%] flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
            <h1 className='text-4xl font-main font-semibold text-[#111111]'>{solbalance && solprice? (solbalance * solprice).toFixed(2) : "0"} USD</h1>
            <p className='font-mono mt-1'>Token Balance</p>
            </div>
         </div>
         
         <div className='w-[100%] flex gap-8 justify-center'>

            <button onClick={handle("Transact/Send")} className='h-[50px] w-[50px] flex justify-center items-center rounded-2xl bg-[#111111] hover:bg-black'>
            <BsSend color="white" size={20} />
            </button>

            <button onClick={handle("Transact/Receive")} className='h-[50px] w-[50px] flex justify-center items-center rounded-2xl bg-[#111111] hover:bg-black'>
            <PiArrowBendLeftDownBold color="white" size={20} />
            </button>

            <button className='h-[50px] w-[50px] flex justify-center items-center rounded-2xl bg-[#111111] hover:bg-black'>
            <IoMdAddCircle color="white" size={20} />
            </button>

            <button className='h-[50px] rotate-90 w-[50px] flex justify-center items-center rounded-2xl bg-[#111111] hover:bg-black'>
            <AiOutlineSwap color="white" size={25} />
            </button>
         </div>

         <div className='w-[100%] px-3 mt-6'>
            <div className='w-[100%] h-[2px] bg-[#ececec]'></div>
            <div className='bg-[#ddffe5] mt-4 flex items-center p-3 rounded-2xl h-[3.5rem] w-[100%]'>
            <img src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/sol.svg"
             className='bg-white h-[40px] w-[40px] rounded-full' />
            
            <div className='px-4'>
                <h5 className='text-black font-mono'>Solana</h5>
                <h5 className='text-black font-main font-medium'>{solbalance ? solbalance : "-"}</h5>
            </div>

            <div className='px-4 h-[100%] flex flex-grow items-center justify-end '>
                <h5 className='text-black font-mono'>${solbalance && solprice? (solbalance * solprice).toFixed(2) : "0"}</h5>
            </div>
            </div>
            {vaultPda? <Tokens vault={vaultPda} /> : null} 
        </div>


         </div>




         <div className=' w-[100%] flex justify-end col-span-2 pl-6'>
         <div className='bg-white overflow-hidden rounded-xl p-5 h-[100%] max-h-[80vh] w-[100%]'>
  <h1 className='text-black font-mono'>Cards</h1>
  <Card />

  <h1 className='text-black mt-8 font-mono'>Recent Transactions</h1>
  <div className='flex flex-col gap-3 py-5 overflow-hidden'>
    <div className="max-h-[50vh] flex flex-col gap-2 overflow-y-auto">
    {transaction && Array.isArray(transaction) && transaction.length > 0 ? (
  transaction.map((item: any, key: number) => (
    <a
      key={key}
      href={`https://explorer.solana.com/tx/${item.signature}?cluster=devnet`} // Replace with the appropriate property that contains the transaction signature
      target="_blank" // Open link in a new tab
      rel="noopener noreferrer" // Recommended for security reasons
      className='text-white px-4 max-h-20 py-3 rounded-2xl bg-[#111111] font-main flex font-medium'
    >
      <div>
        <span>{item.type}</span>
        <h1 className='text-sm font-mono'>From: {item.nativeTransfers[0].fromUserAccount.slice(0,18)}...{item.nativeTransfers[0].fromUserAccount.slice(26)}</h1>
      </div>
      <div className='flex flex-grow justify-end'>
        <span>{(item.nativeTransfers[0].amount / LAMPORTS_PER_SOL).toFixed(4)}</span>
      </div>
    </a>
  ))
) : (
  <div className='text-black px-4 max-h-20 py-3 rounded-2xl font-main flex font-medium'>
    <div>
      <span>No transaction history</span>
    </div>
  </div>
)}
    </div>
  </div>
</div>

         </div>
    </div>
  )
}

export default Index