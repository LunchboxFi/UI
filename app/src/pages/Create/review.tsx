import React from 'react'

function Review() {
  return (
    <div className='w-[100%] h-[100%] px-[4rem]'>
        <div className=' border-[#ffffff50] border-[3px] h-[88vh] p-6 rounded-2xl'>
            <h1 className='font-sans font-normal text-3xl'>Create your lunchbox in a few steps</h1>
            <p className='font-mono mt-3'>Your wallet with the security of web 3 and experience and feel of Web 2</p>
            <div className='h-[100%] flex items-center p-5'>
            <div className='h-[80%] w-[50%] pr-5'>
             <h1 className='font-mono text-4xl'>Review your Lunchbox</h1>
             <p className='font-mono mt-4 font-normal text-[#d4d4d4]'>One last look at the selected parameters before your lunchbox is deployed
             </p>
            </div>
            <div className='h-[80%] overflow-y-auto p-5 font-bold w-[50%] rounded-2xl bg-[#292929]'>
             <h1 className='text-2xl font-mono'>Review your wallet</h1>
             <div className='h-[1px] mt-2 bg-[#969696]'>
             </div>
             <div className=' rounded-2xl p-4 mt-4 w-[100%] bg-[#4d4d4d]'>
              <div className='flex justify-between flex-row'>
                <div>
                <h3 className='font-mono text-2xl'>2/3</h3>
                <span className='font-mono font-normal'>Threshold</span>
                </div>

                <div>
                <h3 className='font-mono text-2xl'>2</h3>
                <span className='font-mono font-normal'>Autonomy</span>
                </div>

                <div>
                <h3 className='font-mono text-2xl'>0.0025<span className='text-[1rem]'>SOL</span></h3>
                <span className='font-mono font-normal'>Fees</span>
                </div>
                
              </div>

             </div>
             <div className='w-[100%] mt-4 flex justify-end'>
             <button className='font-mono rounded-md bg-white h-10 text-black px-3'>Create Lunchbox</button>
             </div>
            </div>
         </div>
        </div>
        
        
    </div>
  )
}

export default Review