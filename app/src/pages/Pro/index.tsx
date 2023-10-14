import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router'

function index() {
  const router = useRouter()

  const handleGateway = () => {
    router.push('Business/Gateway')
  }

  const handle = (Route: string): MouseEventHandler<HTMLButtonElement> => (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push(Route);
  };
  
  return (
    <div className='flex flex-col justify-center items-center py-8'>
     <h2 className='font-sans text-3xl'>Lunchbox<span className='font-main font-medium pl-1'>Pro!</span></h2>
     <p className='font-mono mt-4'>Lunchbox Pro helps crypto natives who are experienced with more technical interactions by making these interactions easier</p>
     <div className='w-[100%] px-12 mt-[10%]'>

     <div className='font-main  font-semibold text-3xl'>Tools</div>

     <div className='h-15 px-6 mt-5 text-black pt-8 pb-5 w-[100%] bg-white rounded-2xl'>
     <h3 className='font-main text-2xl font-medium'>Openbook market cranker</h3>
     <p className='font-mono mt-3'>This tool allows Pros to create markets on Openbook DEX, prefund the market with SOL, run scripts that crank the market at set intervals. Once your SOL balance is below a particular threshold you receive notification from Lunchbox reminding you to refill. this way your prices are always up to date.</p>
     <div className='flex flex-row justify-end mt-2 w-[100%]'><button onClick={handle("./Business/Gateway")} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Run Cranker</button></div>
     </div>

     <div className='h-15 px-6 mt-5 text-black pt-8 pb-5 w-[100%] bg-[#FFFFFF50] rounded-2xl'>
     <h3 className='font-main text-2xl font-medium'>Market Making Bots and Arb Bots</h3>
     <p className='font-mono mt-3'>Spin up your own market making and arbitrage bots on Openbook DEX without writing code.</p>
     <div className='flex flex-row justify-end mt-2 w-[100%]'><button onClick={handle("./Business/Accounts")} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Coming soon</button></div>
     </div>
     </div>
    </div>
  )
}

export default index