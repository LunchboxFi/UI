import React from 'react'

type Props = {}

function Accounts({}: Props) {
  return (
    <div className='flex flex-col px-10'>

    <h1 className='text-2xl font-main font-medium'>Accounts</h1>

    <div className='h-15 px-6 mt-5 text-black pt-5 pb-5 w-[100%] bg-white rounded-2xl'>
     <h3 className='font-main text-2xl font-medium'>Vault Address 1</h3>
     <div className='flex flex-row justify-end mt-1 w-[100%]'><button className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Manage Account</button></div>
     </div>
     <div className='w-[100%] flex justify-center mt-8'>
        <button className='bg-purple-500 text-white font-mono px-3 py-2 rounded-xl'>Generate new vault address</button>
     </div>
    </div>
  )
}

export default Accounts