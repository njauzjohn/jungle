import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/uploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const UploadCategory = ({close,fetchData}) => {

    const [ data,setData] = useState({
        name : "",
        image : ""
    })

    const [loading,setLoading] = useState(false)

    const HandleOnChange =(e)=>{
        const {name , value} = e.target

        setData((preve)=>{
            return {
                ...preve,
                [name] : value
            }
        })
    }

    const HandleSubmit=async(e)=>{
        e.preventDefault()

        try {
            setLoading(true)

            const response = await Axios({
                ...SummaryApi.addCategory,
                data : data
            })

            const {data : responseData}= response

            if(!response.success){
                toast.success(responseData.message)
                close()
                fetchData()
            }

        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    const HandleUploadCategoryImages=async(e)=>{
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const {data : ImageResponse} = response

        setData((preve)=>{
            return{
                ...preve,
                image : ImageResponse.data.url
            }
        })
    }



  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
        <div className='bg-slate-100 max-w-4xl p-4 w-full rounded'>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold'>Category</h1>
                
                <button onClick={close} className='w-fit ml-auto block'>
                    <IoClose size={22}/>
                </button>
            </div>
            <form onSubmit={HandleSubmit} className='my-2 gap-2 grid'>
                <div className='gap-1 grid'>
                    <label id='categoryName'>Name</label>

                    <input
                        type='text'                       
                        id='categoryName'
                        placeholder='Enter category Name'
                        value={data.name}
                        onChange={HandleOnChange}
                        name='name'
                        className='bg-slate-300 border border-amber-400 outline-none'
                    />
                    
                </div>

                <div className='grid gap-1'>
                    <p>Image</p>
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div className='border flex rounded items-center justify-center bg-slate-200 h-36 w-full lg:w-36'>
                            {
                                data.image ?(
                                    <img
                                    alt='category'
                                    src={data.image}
                                    className='w-full h-full object-scale-down'
                                    />
                                ) : (
                                    
                                    <p className='text-sm '>No Image</p>
                                )
                            }
                        </div>
                        <label htmlFor='uploadCategoryImage'>
                            <div className={`
                                ${!data.name ? "bg-gray-400" : "bg-green-600 px-4 py-2 rounded cursor-pointer" }
                            `}>Upload Image</div>
                            <input disabled={!data.name} onChange={ HandleUploadCategoryImages } type='file' id='uploadCategoryImage' className='hidden'/>

                        </label>
                    </div>
                </div>

                <button className={
                    `${data.name && data.image ? "bg-amber-300 hover:bg-amber-400" : "bg-gray-300"}
                    py-2 font-semibold
                    `
                }>
                    Add Category
                </button>
            </form>
        </div>
    </section>
  )
}

export default UploadCategory
