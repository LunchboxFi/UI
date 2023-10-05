import React from 'react'

function index() {
  return (
    <div className='w-[100%] h-[100%] grid grid-flow-row grid-cols-5 p-6'>
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
            <h1 className='text-4xl font-mono'>-USD</h1>
            <p className='font-mono mt-1'>Token Balance</p>
            </div>
         </div>
         
         <div className='w-[100%] flex gap-8 justify-center'>
            <button className='h-[50px] w-[50px] rounded-2xl bg-[#111111]'>

            </button>

            <button className='h-[50px] w-[50px] rounded-2xl bg-[#111111]'>

            </button>

            <button className='h-[50px] w-[50px] rounded-2xl bg-[#111111]'>

            </button>

            <button className='h-[50px] w-[50px] rounded-2xl bg-[#111111]'>

            </button>
         </div>

         <div className='w-[100%] px-3 mt-6'>
            <div className='w-[100%] h-[2px] bg-[#ececec]'></div>
            <div className='bg-[#ddffe5] mt-4 flex items-center p-3 rounded-md h-[3.5rem] w-[100%]'>
            <div className='bg-white h-[40px] w-[40px] rounded-full'></div>
            
            <div className='px-4'>
                <h5 className='text-black'>SPL Token </h5>
                <h5 className='text-black'>Token Amount</h5>
            </div>

            <div className='px-4 h-[100%] flex flex-grow items-center justify-end '>
                <h5 className='text-black'>$0</h5>
            </div>
            </div>
            
        </div>


         </div>




         <div className=' w-[100%] flex justify-end col-span-2 pl-6'>
         <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono'>Cards</h1>
          <div className='bg-green-400 px-6 flex flex-col justify-center border-[1px] h-[45%] mt-4 rounded-2xl border-[#00000040]'>
          <h2 className='text-4xl font-mono pt-20 text-green-900'>1652 5663 2289 0045</h2>
          <div className='flex-grow flex items-end'>
          <h4 className='font-mono pb-4'>Ife Asiadiachi</h4>
          </div>
          </div>

          <h1 className='text-black mt-8 font-mono'>Recent Transactions</h1>
         </div>
         </div>
    </div>
  )
}

export default index