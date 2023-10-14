import React, { MouseEventHandler, useEffect, useState } from 'react'
import * as multisig from '@sqds/multisig'
import { PublicKey } from '@solana/web3.js'
import { useRouter } from 'next/router'
import Toast from '@/components/Toast'

type Props = {}

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
}

function Accounts({}: Props) {
  const [ results, setResults] = useState<Array<string>>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<ToastType>(ToastType.SUCCESS);

  const router = useRouter()

  const showToastMessage = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Automatically hide the toast after 3 seconds
  };

  const handle = (Route: string): MouseEventHandler<HTMLButtonElement> => (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push(Route);
  };

  useEffect(() => {
    const pda = localStorage.getItem('multisig');

    const storedItem = localStorage.getItem('acctCount');
    const parsedItem = storedItem ? parseInt(storedItem) : 0;
   
    if (pda && parsedItem) {
      const pdaPubkey = new PublicKey(pda);

      const fetchData = async () => {
        const updatedResults: string[] = [];
        for (let i = 0; i < parsedItem; i++) {
          try {
            const [vaultPdaResult] = await multisig.getVaultPda({
              multisigPda: pdaPubkey,
              index: i,
            });
            updatedResults.push(vaultPdaResult.toBase58());
          } catch (error) {
            console.error('Error fetching vaultPdaResult:', error);
          }
        }
        setResults(updatedResults);
        console.log(updatedResults);
      };

      fetchData();
    }
  }, [results]);

  const generateNewAccount = () => {
    const storedAccounts = localStorage.getItem('acctCount');
    const parsedItem = storedAccounts ? parseInt(storedAccounts) : 0;
  
    if (parsedItem === 0 || !parsedItem) {
      console.error("Something went wrong when generating the accounts");
    } else {
      const add = parsedItem + 1;
      localStorage.setItem('acctCount', add.toString());
      setToastMessage("New account created")
      setToastType(ToastType.SUCCESS)
      showToastMessage()
    }
  };

  useEffect(() => {
    const storedAccounts = localStorage.getItem('acctCount');

    if(!storedAccounts) {
      const accounts = localStorage.setItem('acctCount', "2");
    }
    
  },[])

  return (
    <div className='flex flex-col w-full h-15 items-center pb-6 justify-center px-[20%]'>
      <h1 className='text-2xl font-main font-medium'>Accounts</h1>
      <div className='w-full mt-5'>
        {results.map((result, index) => (
          <div key={index} className='mt-5 text-black p-5 h-[15%] bg-white rounded-xl w-full'>
            <h3 className='font-main text-2xl font-medium px-6 pt-5 pb-5'>Account address: {result}</h3>
            <div className='flex justify-end w-full mt-1'>
              <button onClick={handle(`${result}`)} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Manage Account</button>
            </div>
          </div>
        ))}
      </div>
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className='w-full flex justify-center mt-8'>
        <button onClick={generateNewAccount} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Generate new vault address</button>
      </div>
    </div>
  )
}

export default Accounts