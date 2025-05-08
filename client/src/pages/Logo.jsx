import React, { useState } from 'react'

import uploadImage from '../utils/uploadImage'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { useNavigate } from 'react-router-dom'
import Axios from '../utils/Axios'

const Logo= () => {

    const [data,setData]=useState({
        name : "",
        image : []
    })

    const navigate = useNavigate()

    const handleChange=(e)=>{
        const {name, value} = e.target
    
        setData((preve)=>{
          return{
            ...preve,
            [name] : value
          }
        })
      }
    
      const handleUploadImage=async(e)=>{
        const file =e.target.files[0]
        if(!file){
          return
        }
        // setImageLoading(true)
    
        const response = await uploadImage(file)
        const { data : imageResponse} = response
        const imageUrl = imageResponse.data.url
        
        setData((preve)=>{
          return {
            ...preve,
            image : [...preve.image, imageUrl]
          }
        })
    
        // setImageLoading(false)
    
        console.log("file",file)
      }

      const handleSubmit =async(e)=>{
        e.preventDefault()
        e.stopPropagation()
       // console.log("data",data)
        try {
          const response = await Axios({
            ...SummaryApi.CreateLogo ,
            data : data
          })
    
          const {data : responseData} = response
          if(responseData.success){
            toast.success(responseData.message)
          }
    
          navigate('/')
    
          console.log("data-product",responseData)
        } catch (error) {
          AxiosToastError(error)
         // console.log(error)
        }
    
      }

  return (
    <div className=' rounded-full w-fit bg-blue-300'>
     <form onSubmit={handleSubmit} className='grid gap-2 p-2'> 
     <div>
     <div className='grid gap-1 '>
            <label htmlFor='name'>Shop Name</label>
            <input
            id='name'
              type ='text'
              placeholder='Enter shop name'
              value={data.name}
              name='name'
              onChange={handleChange}
              required
              className='bg-slate-200 outline-none border focus-within:border-amber-300 rounded'
            />s
        </div>
     </div>
     <div>
     <p>Image</p>
          <label htmlFor='productImage' className='bg-slate-200 cursor-pointer h-28 border rounded items-center flex justify-center'>
            {/* <div className='flex flex-col items-center justify-center'>
                {
                  imageLoading ? <Loading/> : (
                    <>
                      <IoCloudUpload size={32}/>
                      <p>Upload Image</p>
                    </>
                  )
                }
                
                
              
            </div> */}
            <input
              type='file'
              id='productImage'
              accept='image/*'
              onChange={handleUploadImage}
              className='hidden'
            />
          </label>
     </div>

     <div>
            <button  className='bg-emerald-400 hover:bg-emerald-700 cursor-pointer rounded w-full my-4'>
              Submit
            </button>
          </div>
      </form> 
    </div>



   
  )
}

export default Logo
