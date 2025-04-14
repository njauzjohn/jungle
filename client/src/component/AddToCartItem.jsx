import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import { useGlobalContext } from '../provider/GlobalProvider'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";


const AddCartItem = ({data}) => {

    const {fetchCartItem, updateCartItem, deleteCartItem} = useGlobalContext()
   const cartItem = useSelector(state => state.cartItem.cart)
  // console.log("CartItem",cartItem)
  const [isAvailableinCart,setIsAvailableInCart] = useState(false)
  const [qty,setQty] = useState(0)
  const [cartItemDetails,setCartitemdetails] = useState()
  const handleToCart = async (e)=>{
        e.preventDefault()
        e.stopPropagation()

        try {
            const response = await Axios({
                ...SummaryApi.addToCart,
                data : {
                    productId : data?._id
                }
            })


            const {data : responseData} = response

            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem()
                }
            }
            console.log("cart",responseData)

        } catch (error) {
            AxiosToastError(error)
           //console.log("Cart",cart)
        }
    }

    useEffect(()=>{
        const checkCartItem = cartItem.some(item  => item?.productId?._id === data?._id)
        setIsAvailableInCart(checkCartItem)
        
        const qtyCartItem = cartItem?.find(item => item?.productId?._id === data?._id)

        setQty(qtyCartItem?.quantity)
        setCartitemdetails(qtyCartItem)
      //  console.log("CheckItem",checkCartItem)
    },[cartItem,data])

  const increaseQty =(e)=>{
    e.preventDefault()
    e.stopPropagation()

    updateCartItem(cartItemDetails?._id,qty+1)
  }

  const decreaseQty =(e)=>{
    e.preventDefault()
    e.stopPropagation()

    if(qty === 0){
        deleteCartItem(cartItemDetails?._id)
        
    }else
    {
        updateCartItem(cartItemDetails?._id,qty-1)
      
    }

   
  }
  
  return (
    <div>
        {
            isAvailableinCart ? (
                <div className='flex '>
                    <button onClick={increaseQty} className='bg-green-500 text-white flex-1 '>
                        <FaPlus/>
                    </button>
                    <p>{qty}</p>
                    <button onClick={decreaseQty} className='bg-red-500 text-white flex-1'>
                        <FaMinus/>
                    </button>
                </div>
            ) :
            (
                <button onClick={handleToCart} className='w-10 ml-auto items-center justify-center bg-green-500 rounded'>
                    Add
                    </button>
            )
        }
       
    </div>
  )
}

export default AddCartItem
