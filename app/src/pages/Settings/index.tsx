import React from 'react'

function index() {
  return (
    <div className='w-[100%] h-[100%] flex justify-center'>

         <div className=' w-[50%] flex justify-end'>
         <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono text-2xl'>Settings</h1>
          <h1 className='text-black mt-8 font-mono'>Email Address</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <span className='font-mono '>idasiadiachi@gmail.com</span>
          </div>
          <button className='font-mono rounded-md border-[3px] border-[#292929] bg-white h-[100%] w-[45%] text-black px-3'>Verify Email</button>
          </div>

          <h1 className='text-black mt-8 font-mono'>Set spending limit</h1>
          <div className='bg-[#292929] h-10 flex items-center justify-end overflow-hidden rounded-md'>
          <div className='overflow-hidden flex w-[100%] pl-4 justify-start'>
          <span className='font-mono '>No limit</span>
          </div>
          <button className='font-mono rounded-md border-[3px] border-[#292929] bg-white h-[100%] w-[45%] text-black px-3'>Change limit</button>
          </div>

         </div>
         </div>
    </div>
  )
}

export default index