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
import { useDispatch, useSelector } from 'react-redux'
import MenuProfile from './MenuProfile'
import { handleAddItemCart } from '../store/cartProduct'
import Logo from '../pages/Logo'
import LogoProfile from '../pages/LogoProfile'

const CardProduct = ({ data }) => {

    const url = `/product/${data.name}-${data._id}`
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.user._id)
    const dispatch = useDispatch()
    
    
    //localStorage.clear()
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

    const handleclearcart =()=>{
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

    useEffect (()=>{
        handleclearcart()
    },[])

    return (
        <div>
            <Link to={url} className='p-4 bg-white grid gap-3 rounded  max-w-60'>

                <LogoProfile/>
                {/* //clear cart on click */}
                <div className='  bg-slate-300 rounded'>
                    <img
                        src={data?.image[0]}

                    />

                </div>
                <div className='p-2 bg-red-300 rounded'>{data?.ShopName}</div>

                <div className='p-2 w-40 bg-blue-300 rounded'>{data?.name}</div>
                <div className='p-2 w-40 bg-green-300 rounded'>{data?.unit}</div>
                <div className='p-2 w-40 bg-slate-300 rounded'>{data?.description}</div>

                <div className='flex items-center gap-2 justify-betweens'>

                    <div className=' bg-blue-300 rounded'>{Pricecurrency(DiscoutPrice(data.price))}</div>


                 </div>

            </Link>

        </div>

    )
}

export default CardProduct
