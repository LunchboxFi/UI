import React, { MouseEventHandler } from 'react'
import { useRouter } from 'next/router'

function Header() {

  const router = useRouter()

  const handle = (route: string) => () => {
      router.replace(route); // ensure an absolute path
  };
  
  return (
    <div>
    <div className='flex items-center p-5 w-[100%] justify-between'>
    <h2 onClick={handle("Dashboard")} className='font-sans cursor-pointer font-normal text-2xl'>Lunchbox</h2>

    <div className='flex items-center flex-row'>
    <h1 onClick={handle("Pro")} className='px-3 cursor-pointer font-mono'>Pro</h1>
    <h1 onClick={handle("Business")} className='px-3 cursor-pointer font-mono'>Business</h1>
    <h1 onClick={handle("Settings")} className='px-3 cursor-pointer font-mono'>Settings</h1>
    <button className='font-mono bg-[#d6d6d6] text-black font-700 px-3 py-1 rounded-md flex items-center'>Import wallet</button>
    </div>
    </div>
    </div>
  )
}

export default Header