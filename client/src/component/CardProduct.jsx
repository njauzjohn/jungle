import React, { useEffect, useState } from 'react'
import ProductCardDisplay from './ProductCardDisplay'
import { Pricecurrency } from '../utils/Pricecurrency'
import { Link } from 'react-router-dom'
import { DiscoutPrice } from '../utils/DiscountPrice'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios' 
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { LuCircleUserRound } from "react-icons/lu";
import AddCartItem from './AddToCartItem'
import { useSelector } from 'react-redux'
import MenuProfile from './MenuProfile'

const CardProduct = ({data}) => {
    
    const url = `/product/${data.name}-${data._id}`
    const [loading,setLoading] = useState(false)
    const user = useSelector(state => state.user)
   
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
            <div className=' bg-blue-300 rounded'>{Pricecurrency(DiscoutPrice(data.price))}</div>
                {/* <button onClick={handleToCart} className='w-10 ml-auto items-center justify-center bg-green-500 rounded'>
                    Add
                </button> */}
                <AddCartItem data={data}/>
            </div>

            <div className='w-10 py-2 flex items-center justify-center rounded-full  drop-shadow-lg'>

                            
                {

                    user?.avatar ?  (
                        <div>
                                <img
                                alt= {user.name}
                                src={user.avatar}
                                className='rounded-full' 
                                
                            />
                            <div>
                                <p className='text-green-500'>visited As ...</p>
                                <p className='text-blue-500' >{user?.name}</p> 
                                </div>
                                </div>
                    
                    
                            ) : (

                    <LuCircleUserRound size={22}/>
                   
                )

                    }

            </div>

            {/* <MenuProfile/>  */}

        </Link> 
   
   </div>
   
  )
}

export default CardProduct
