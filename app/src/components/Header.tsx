import React from 'react'

function Header() {
  return (
    <div>
    <div className='flex items-center p-5 w-[100%] justify-between'>
    <h2 className='font-sans font-normal text-2xl'>Lunchbox</h2>

    <div className='flex items-center flex-row'>
    <h1 className='px-3 font-mono'>Pro</h1>
    <h1 className='px-3 font-mono'>Pixels</h1>
    <h1 className='px-3 cursor-pointer font-mono'>Settings</h1>
    <button className='font-mono bg-[#d6d6d6] text-black font-700 px-3 py-1 rounded-md flex items-center'>Import wallet</button>
    </div>
    </div>
    </div>
  )
}

export default Header