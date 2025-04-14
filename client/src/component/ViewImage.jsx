import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
  return (
    <div className='fixed bottom-0 right-0 left-0 top-0 flex items-center justify-center z-50 p-4'>
      <div className='w-full max-w-md p-4 bg-slate-200'>
           
            <button onClick={close} className='w-fit block ml-auto cursor-pointer'>
            <IoClose size={22}/>
           </button>
           
            <img
            
                src={url}
                alt='full screen'
                className='w-full h-full object-scale-down'
            
            />
      </div>
    </div>
  )
}

export default ViewImage
