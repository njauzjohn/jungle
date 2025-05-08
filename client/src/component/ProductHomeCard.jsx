import React, { useState } from 'react'
import EditProduct from './EditProduct'
import { Pricecurrency } from '../utils/Pricecurrency'
import { IoClose } from 'react-icons/io5'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import AddCartItem from './AddToCartItem'

const ProductHomeCard = ({data, fetchProductData}) => {
    const [openEdit,setOpenEdit] = useState(false)
    const [openDelete,setOpenDelete] = useState(false)
    //const {data} = useState([])
  
    const handleDelete = async()=>{
      try {
        const response = await Axios({
          ...SummaryApi.deleteProduct,
          data : {
            _id : data._id
          }
        })
  
  
        const {data : responseData} = response
  
        if(responseData.success){
          toast.success(responseData.message)
          if(fetchProductData){
            fetchProductData()
          }
  
          setOpenDelete(false)
        }
  
      } catch (error) {
        AxiosToastError(error)
      }
    }
    const handleCancel =()=>{
      setOpenDelete(false)
    }
    return (
      <div className='w-52 p-4 bg-white rounded flex justify-between '>
        <div className='grid'>
          <img
              src={data?.image}
              alt={data?.name}
              className='w-full h-full  object-scale-down'
          
          />
  
          <div>
              <p className='bg-blue-300 rounded-full px-2 text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
              <p className='text-slate-500 bg-slate-300 rounded-full px-2 my-2'>{data?.unit}</p>
              <div className='p-2 w-40 bg-slate-300 rounded'>{data?.description}</div>

              <p className='bg-blue-300 rounded-full px-2 my-2 w-ful'>{Pricecurrency(data?.price) }</p>
           
             
             
              {/* <div className='flex justify-between gap-4 '>
                <button onClick={()=>setOpenEdit(true)} className='bg-green-400 hover:bg-green rounded cursor-pointer px-2 my-2 w-fit '>Edit</button>
                <button onClick={()=>setOpenDelete(true)} className='bg-red-400 hover:bg-red-700 rounded cursor-pointer px-2 my-2'>Delete</button>
              </div> */}
            
          </div>
          {/* {
            openEdit && (
              <EditProduct data={data} fetchProductData={fetchProductData} close={()=>setOpenEdit(false)}/>
            )
          }
  
          { 
            openDelete && (
              <section className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4'>
                <div className='bg-white p-4 w-full max-w-md rounded-md '>
                  <div className='flex items-center justify-between gap-4'>
                    <h3>Delete permanent</h3>
                    <button onClick={()=>setOpenDelete(false)} className='cursor-pointer'>
                      <IoClose/>
                    </button>
                  </div>
                  <div className='flex justify-end gap-4 my-3'>
                    <button onClick={handleCancel} className='py-1 rounded bg-green-400 p-4'>Cancel</button>
                    <button onClick={handleDelete} className='py-1 rounded bg-red-400 p-4'>Confirm</button>
                  </div>
                </div>
              </section>
            )
          
          } */}

          <AddCartItem data={data}/>
          
        </div>
        
      </div>
      
    )
}

export default ProductHomeCard





