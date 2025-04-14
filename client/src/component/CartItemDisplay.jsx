import React from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';

import { Pricecurrency } from '../utils/Pricecurrency';
import { useGlobalContext } from '../provider/GlobalProvider';
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux';
import AddCartItem from './AddToCartItem';
import { DiscoutPrice } from '../utils/DiscountPrice';

const CartItemDisplay = ({close}) => {
    const {totalPrice} = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector((state)=> state.user)
    const navigate = useNavigate()
    const redirectCheckOutPage =()=>{
        if(user?._id){
            navigate("/checkout")
            return
        }
        if(close){
            (close)}
        toast("please login")

        //part 5 12:20
    } 
 
    return (
    <section className='bg-slate-300 fixed top-0 bottom-0 right-0 left-0 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen ml-auto'>
            <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                <h2 className='font-semibold'> Cart</h2>
               
               <Link to={'/'} className='lg:hidden'>
                    <IoClose size={25}/>
               </Link>

                <button onClick={close} className='cursor-pointer hidden lg:block'>
                    <IoClose size={25}/>
                </button>
                
            </div>

            <div className='min-h-[80vh]  rounded p-4 grid gap-4 '>
                <div className='gap-4'>
                    {
                        cartItem[0] && (
                            cartItem?.map((item,index)=>{
                                return(
                                    <div key={item._id + "cartItemDisplay"} className='flex w-full gap-2'>
                                        <div className='w-16 h-16 border rounded'>
                                            <img
                                            
                                                src={item?.productId?.image[0]}
                                                className='object-scale-down h-full w-full'
                                            
                                            />
                                        </div>
                                        <div className='w-full text-xs'>
                                        
                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                            <p className='text-grey-100'>{item?.productId?.unit}</p>
                                            <p>{Pricecurrency(DiscoutPrice(item?.productId?.price,item?.productId?.discount))}</p>
                                        
                                        </div>
                                        <div>
                                            <AddCartItem data={item?.productId}/>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <div className='bg-green-400 text-neutral-100 py-3 sticky bottom-3 rounded flex items-center gap-4 justify-between'>
                    <div>
                        {Pricecurrency(totalPrice)}
                    </div>

                    <button onClick={redirectCheckOutPage} className='flex items-center gap-1'>
                      Proceed
                      <span>
                        <FaAngleRight/>
                      </span>
                     </button>
            </div>

            
        </div>
    </section>
  )
}

export default CartItemDisplay
