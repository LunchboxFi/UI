import React, { useEffect, useState } from 'react'

function Card() {
  const [nonce, setNonce] = useState<any>();

  useEffect(() => {
    const nonce = localStorage.getItem('nonce')
    setNonce(nonce)   
  },[])
  
  return (
    <div className='w-[100%] h-[100%] flex justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono'>Card control</h1>

          <div className='bg-green-400 mx-auto w-[80%] flex flex-col justify-center px-8 border-[1px] h-[15rem] mt-4 rounded-2xl border-[#00000040]'>
          <h2 className='text-4xl font-main pt-20 font-semibold text-[#00000070]'>1652 5663 2289 0045</h2>
          <div className='flex-grow flex items-end'>
          <div className='font-mono text-green-100 bg-[#111111] rounded-full px-3 mb-4'>
          <h4 >{nonce}</h4>
          </div>
          </div>
          </div>

          <h1 className='text-black mt-12 font-mono'>Card lock</h1>
         </div>
         </div>
    </div>
  )
}

export default Card