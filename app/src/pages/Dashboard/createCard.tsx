import React, {useEffect, useState} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';

const supabase = createClientComponentClient()

function CreateCard() {
  const [pin, setPin] = useState<number>()
  const [card, setCard] = useState<number | null>()
  const [nonce, setNonce] = useState<string| any>()
  const [hascard, setHasCard] = useState<boolean>(false)

  const PINValidationSchema = Yup.object().shape({
    pin: Yup.string()
      .matches(/^\d{4}$/, 'PIN must be 4 digits')
      .required('PIN is required'),
    confirmPin: Yup.string()
      .oneOf([Yup.ref('pin')], 'PINs must match')
      .matches(/^\d{4}$/, 'PIN must be 4 digits')
      .required('Confirm PIN is required'),
  });


  useEffect(() => {
    (async() => {
     const multisigPda = localStorage.getItem('multisig')
     let { data: cards, error } = await supabase
       .from('cards')
       .select('card_number')
       .eq('multisigPda', multisigPda)
       console.log(cards)
    let data = cards ? cards.length : 0;
    if (data > 0) {
        setHasCard(true)
        cards ? setCard(cards[0]?.card_number) : null
    }
    })();
  },[])

const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const key = localStorage.getItem('privateKeys')
    const multisigPda = localStorage.getItem('multisig')
    const payload = {
        pin: values.pin,
        key: key,
        multisig: multisigPda
    }
    console.log(payload)
    try {
        const response = await fetch('/api/createCard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          console.log(response)
        }
  
        const data = await response.json();
        if(data){
            console.log(data.data.card)
            setCard(data.data.card)
            const updatedNonce = data.data.userNonce;
            setNonce(updatedNonce);
            localStorage.setItem("nonce", updatedNonce);   
        }

      } catch (error) {
        console.error('Error:', error);
      }
      
      setSubmitting(false);
    
  };

  function pretify(input: any) {
    // Use a regular expression to insert a space every four characters

    const inputString = input.toString()
    return inputString.replace(/(.{4})/g, '$1 ');
  }

  return (
    <div className='w-[100%] h-[100%] flex justify-center'>
      <div className='w-[50%] flex justify-end'>
        <div className='bg-white rounded-xl p-5 h-[100%] w-[100%]'>
          <h1 className='text-black font-mono'>Card control</h1>

          <Formik
            initialValues={{
              pin: '',
              confirmPin: '',
            }}
            validationSchema={PINValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>

                { hascard ?
                 <div className='bg-green-400 mx-auto w-[80%] flex flex-col justify-center px-8 border-[1px] h-[15rem] mt-4 rounded-2xl border-[#00000040]'>
                 <h2 className='text-4xl font-main font-semibold pt-20 text-green-900'>{pretify(card)}</h2>
                 <div className='flex-grow flex items-end'>
                 <p className='font-mono text-[#000000]'>You already have a card!</p>
                 </div>
                 </div>
                 : 
                <div className='bg-black mx-auto w-[80%] flex flex-col justify-center px-8 border-[1px] h-[15rem] mt-4 rounded-2xl border-[#00000040]'>
                  <button type='submit' className='mt-20 text-black py-3 w-[30%] font-medium rounded-xl bg-white font-main'>
                    Create card
                  </button>
                  <div className='flex-grow flex items-end'></div>
                </div> }
                {
                    hascard? 
                   null : <div className='flex text-black flex-col items-center'>
                  <h1 className='text-black mt-12 font-mono'>Input PIN</h1>
                  <Field
                    type='text'
                    name='pin'
                    placeholder='PIN'
                    className='outline-none text-center font-main font-medium px-auto max-h-12 text-xl p-3 mt-3 rounded-xl w-[30%] bg-[#dfd0eb30]'
                  />
                  <ErrorMessage name='pin' component='div' className='text-red-600 font-mono' />

                  <h1 className='text-black mt-6 font-400 font-mono'>Confirm PIN</h1>
                  <Field
                    type='password'
                    name='confirmPin'
                    placeholder='PIN'
                    className='outline-none text-center font-main font-medium px-auto max-h-12 text-xl p-3 mt-3 rounded-xl w-[30%] bg-[#dfd0eb30]'
                  />
                  <ErrorMessage name='confirmPin' component='div' className='text-red-600 font-mono' />
                </div> 
                }
                
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateCard;
