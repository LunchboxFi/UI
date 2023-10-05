import React from 'react'

export default function app() {
  return (
    <div>

        <div className='h-[80vh] flex items-center justify-center w-[100%]'>
            <div className='flex flex-col w-[60%] h-[60%] justify-center rounded-xl items-center border-[3px] border-[#62247570]'>
            <h1 className='font-mono font-bold text-[3rem]'>Create your Lunchbox</h1>
            <button className='font-mono bg-[#d6d6d6] text-black px-3 font-bold py-1 rounded-md flex items-center'>Create wallet</button>
            </div>
        </div>
    </div>
  )
}
