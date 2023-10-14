import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from 'next/router';

function Success() {

  const router = useRouter();
  const { receiver, amount, symbol} = router.query



  return (
    <div className='w-[100%] text-black  flex justify-center '>
        <div className='bg-white px-8 text-center rounded-2xl py-12 w-[50%]'>
        <Player
           autoplay
           loop
           src={"lottie.json"}
           className="h-[100%] w-[10rem] xl:w-[50%]"
         />
         <h3 className='font-main font-medium'>You successfully transfered {amount} {symbol} to {receiver}</h3>

        </div>
    </div>
  )
}

export default Success