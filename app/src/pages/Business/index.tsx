import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router'

function Index() {
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
     <h2 className='font-sans text-3xl'>Lunchbox<span className='font-main pl-1'>Business</span></h2>
     <p className='font-mono mt-4'>{`Use lunchbox to power your business's financials`}</p>
     <div className='w-[100%] px-12 mt-[10%]'>
     <div className='font-main  font-semibold text-3xl'>Tools</div>

     <div className='h-15 px-6 mt-5 text-black pt-8 pb-5 w-[100%] bg-white rounded-2xl'>
     <h3 className='font-main text-2xl font-medium'>Virtual terminal</h3>
     <p className='font-mono mt-3'>{`Empower your business to seamlessly process in-person payments at scale, leveraging the blazing speed and cost-effectiveness of the Solana blockchain. With Solana's innovative technology, confirm bank transfers instantly and delight your customers, all while keeping your hardware costs at ZERO. Experience the advantage of Solana's rapid transactions and transactions costs as low as a fraction of a cent, making your payment processing efficient and affordable on Lunchbox Gateway.`}</p>
     <div className='flex flex-row justify-end mt-2 w-[100%]'><button onClick={handle("./Business/Gateway")} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Enable Gateway</button></div>
     </div>

     <div className='h-15 px-6 mt-5 text-black pt-8 pb-5 w-[100%] bg-white rounded-2xl'>
     <h3 className='font-main text-2xl font-medium'>Branches</h3>
     <p className='font-mono mt-3'>Branches allows business owners to generate multiple receiver addresses and distribute to their staff but controlled by them. This ways they can track financial in flow per staff without the overhead of building the infrastructure from the ground up.</p>
     <div className='flex flex-row justify-end mt-2 w-[100%]'><button onClick={handle("./Business/Accounts")} className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Manage Accounts</button></div>
     </div>
     </div>
    </div>
  )
}

export default Index