import React from 'react'
import { IoClose } from "react-icons/io5";


const ConfirmBox = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50 p-4 flex justify-center items-center'>
        <div className='bg-slate-300 w-full max-w-sm p-4 rounded'>
           <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Delete permanent</h1>
                <button onClick={close}>
                    <IoClose size={22}/>
                </button>
           </div>
           <p className='my-4'>Are you sure!!!</p>
            <div className='w-fit ml-auto flex items-center gap-3'>
                <button className='px-4 py-1 border border-red-500 text-red-500 cursor-pointer hover:text-white hover:bg-red-500 rounded' onClick={cancel}>Cancel</button>
                <button className='px-4 py-1  border border-green-500 text-green-600 hover:text-white hover:bg-green-400 rounded'onClick={confirm} >Confirm</button>
            </div>
        
        </div>
    </div>
  )
}

export default ConfirmBox
