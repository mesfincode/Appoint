import Image from 'next/image'
import React from 'react'

const EmptyData = ({message,sidebar}:{message:string,sidebar?:boolean}) => {
  return (
    <div className='w-full flex flex-col items-center gap-4 my-8'>
      {
        sidebar?<Image src='/images/no-data.svg' width={150} height={150} alt='no-data' />:<Image src='/images/no-data2.svg' width={250} height={250} alt='no-data' />
      }
      <h1 className='text-black-2 font-bold'>{message}</h1>
    </div>
  )
}

export default EmptyData
