import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

const AddField = ({close,value,onChange,submit}) => {
  return (
    <section className='fixed top-0 z-50 flex items-center justify-center right-0 left-0 bottom-0'>
        <div className='bg-slate-300 rounded p-4 w-full max-w-md'>
            <div className='flex items-center justify-between gap-3'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close}>
                    <AiOutlineClose/>
                </button>
            </div>
            <input 
                className='bg-slate-200 my-2 p-1 border outline-none rounded w-full '
                placeholder='Enter field name'
                value={value}
                onChange={onChange}

            />

            <button
            onClick={submit}
            className='bg-emerald-400 hover:bg-emerald-700 cursor-pointer px-2 py-1 rounded mx-auto w-fit block'>
                Add Field
            </button>
            
        </div>
    </section>
  )
}

export default AddField
