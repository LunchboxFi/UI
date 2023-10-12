import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


export default function Card() {
  const [nonce, setNonce] = useState<any>();
  const router = useRouter()
    

    useEffect(() => {
      const nonce = localStorage.getItem('nonce')
      setNonce(nonce)   
    },[])

    const handleCardRoute = () => {
        // router.push("Dashboard/Card")
      }


    return(
        <div className='w-[100%] h-[45%]'>
         <div onClick={handleCardRoute} className='bg-green-400 h-[100%]  cursor-pointer px-6 flex flex-col justify-center border-[1px] mt-4 rounded-2xl border-[#00000040]'>
          <h2 className='text-4xl font-main pt-20 font-semibold text-[#00000070]'>1652 5663 2289 0045</h2>
          <div className='flex-grow flex items-end'>
          <h4 className='font-mono text-[#00000070] pb-4'>{nonce}</h4>
          </div>
          </div>
        </div>
    )
}