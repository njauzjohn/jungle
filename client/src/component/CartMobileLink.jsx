import React from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { TiShoppingCart } from "react-icons/ti";
import { Link } from 'react-router-dom';
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Pricecurrency } from '../utils/Pricecurrency';

const CartMobileLink = () => {

    const { totalPrice, totalQty} = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
  return (

    <>
    <div className='sticky bottom-4 p-3'>
    {
             cartItem[0] && (
                <div >
                    <div className='bg-green-600 p-2 rounded text-neutral-100 flex lg:hidden items-center justify-between gap-3'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-green-400 rounded w-fit'>
                            <TiShoppingCart/>
                        </div>
        
                        <div className=''>
                            <p>{totalQty}Items</p>
                            <p>{Pricecurrency(totalPrice)}</p>
                        </div>
                        
                    </div>
        
                    <Link to={"/Cart"} className='flex items-center gap-1'>
                        <span className='text-sm'>View Cart</span>
        
                        <FaCaretRight/>
        
                    </Link>
                    </div>
        
                </div>
            )
        }

    </div>

     
    </>

    
  )
}

export default CartMobileLink
