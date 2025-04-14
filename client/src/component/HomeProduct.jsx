import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HomeProduct = ({data}) => {
  
    const url = `/product/${data?.name}-${data?._id}`
    const [loading,setLoading] = useState(false)
   
   
    // const handleToCart = async (e)=>{
    //     e.preventDefault()
    //     e.stopPropagation()

    //     try {
    //         const response = await Axios({
    //             ...SummaryApi.addToCart,
    //             data : {
    //                 productId : data._id
    //             }
    //         })


    //         const {data : responseData} = response

    //         if(responseData.success){
    //             toast.success(responseData.message)
    //         }
    //         console.log("cart",responseData)

    //     } catch (error) {
    //         AxiosToastError(error)
    //     }
    // }
  console.log("productData",url)
    return (
   <div>
       <Link to={url} className='p-4 bg-white grid gap-3 rounded  max-w-60'>
            <div className='min-h-30  bg-slate-300 rounded'>
                <img
                    src={data?.image[0]}
                    
                />
        
            </div>
            <div className='p-2 w-40 bg-blue-300 rounded'>{data?.name}</div>
            <div className='p-2 w-40 bg-green-300 rounded'>{data?.unit}</div>
            <div className='p-2 w-40 bg-slate-300 rounded'>{data?.description}</div>
            <div className='flex items-center gap-2 justify-betweens'>
            {/* <div className=' bg-blue-300 rounded'>{Pricecurrency(DiscoutPrice(data.price))}</div> */}
                {/* <button onClick={handleToCart} className='w-10 ml-auto items-center justify-center bg-green-500 rounded'>
                    Add
                </button> */}
                {/* <AddCartItem data={data}/> */}
            </div>
        </Link> 
   
   </div>
   
  )
 
}

export default HomeProduct
