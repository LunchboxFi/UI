import React from 'react'

function Card() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono'>Card control</h1>

          <div className='bg-green-400 mx-auto w-[80%] flex flex-col justify-center px-8 border-[1px] h-[15rem] mt-4 rounded-2xl border-[#00000040]'>
          <h2 className='text-4xl font-mono pt-20 text-green-900'>1652 5663 2289 0045</h2>
          <div className='flex-grow flex items-end'>
          <h4 className='font-mono pb-4'>Ife Asiadiachi</h4>
          </div>
          </div>

          <h1 className='text-black mt-12 font-mono'>Card lock</h1>
         </div>
         </div>
    </div>
  )
}

export default Card