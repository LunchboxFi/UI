import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsArrowRightShort, BsDiscord, BsTwitter } from 'react-icons/bs'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex bg-background bg-contain min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className='flex flex-col items-center'>
      <h1 className='font-sans font-normal text-[2.5rem]'>your card.</h1>
      <h1 className='font-sans font-normal text-[5.5rem]'>your rules.</h1>
      </div>
      
      <div className='grid grid-flow-row grid-cols-7 w-[100%]'>

      <div className='py-[60%] h-[100%] w-[100%]'>
      <div>
        <h3 className='font-sans font-normal'>1. Spend anywhere</h3>
        <h3 className='font-mono font-normal mt-3'>Spend any SPL token anywhere in the world no restrictions, for real this time</h3>
      </div>
      </div>
      <div className=' col-span-5 h-[100%] w-[100%]'>
      <img src='Cards.png' className='h-[100%] w-[100%]' alt='Hero cards' />
      </div>
      <div className='h-[100%] flex-col mt-[60%] justify-end w-[100%]'>
      <div className=' h-[100%] w-[100%]'>
        <h3 className='font-sans mt-[9rem] font-normal'>1. Leverage solana's  infrastructure</h3>
        <h3 className='font-mono font-normal mt-3'>Transaction that cost a fraction of a cent and speed of less than a second</h3>
      </div>
      </div>
      </div>
      
      <div>
        <button className='bg-white p-3 rounded-full'>
          <BsArrowRightShort color='black' size={50} />
        </button>
      </div>

      {/* <div className='flex relative w-[100%] justify-center items-center gap-3 h-[20%] mt-[10%] bottom-0'>
        <BsDiscord size={30} />
        <BsTwitter size={30} />
      </div> */}
    </main>
  )
}
