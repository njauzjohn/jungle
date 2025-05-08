import React, { useEffect, useState } from 'react'
import jungle from '../assets/jungle.png'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { RxAvatar } from "react-icons/rx";
import useMobile from '../hook/useMobile';
import { GiShoppingCart } from "react-icons/gi";
import { useSelector } from 'react-redux';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import UserMenu from './UserMenu';
import { Pricecurrency } from '../utils/Pricecurrency';
import { useGlobalContext } from '../provider/GlobalProvider';

import CartItemDisplay from './CartItemDisplay';
import Booking from './Booking';


const Header = () => {

  const [isMobile] = useMobile()
  const location = useLocation()
  const isSearchPage = location.pathname === "/search"
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user)
  const [openUserMenu, setUserMenu] = useState(false)
  //console.log('user from store', user)
   const CartItem = useSelector(state => state?.cartItem?.cart)
    const {totalPrice,totalQty} = useGlobalContext()
    const [openCart,SetOpenCart] = useState(false)
   // const [totalPrice,setTotalPrice] = useState(0)
  // const [totalQty, setTotalQty] = useState(0)
  //console.log("cartItem",CartItem)

  
  
  const redirectToLoginPage = () => {
    navigate("/login")
  }
  //console.log("isMobile", isMobile)
  //console.log("isSearchPage", isSearchPage)

  const handleCloseUserMenu = () => {
    setUserMenu(false)
  }

  const handleMobileUser=()=>{
    if(user._id){
      navigate("/")
      //return
    }

    navigate("/User")
  }

  // useEffect(()=>{
  //   const qty = CartItem.reduce((preve,curr)=>{
  //     return preve + curr.quantity
  //   },0)
  //   setTotalQty(qty)
  //   //console.log(qty)
  //   const tPrice = CartItem.reduce((preve,curr)=>{
  //     return preve + (curr.productId.price * curr.quantity)
  //   },0)
  //   //console.log("price",tPrice)
  //   setTotalPrice(tPrice)
  // },[CartItem])
  return (
    <header className='h-15 shadow-md container sticky top-0 mx-auto flex z-40 items-center  px-2 justify-between gap-4 bg-white '>
      {
        !(isSearchPage && isMobile) && (
          <div className='  '>
            <Link className='h-full'>
              <div className='h-full  ' >
                <img
                  src={jungle}
                  width={120}
                  height={70}
                  alt='jungle'
                  className='hidden lg:block'
                />

                <img
                  src={jungle}
                  width={80}
                  height={70}
                  alt='jungle'
                  className='lg:hidden'
                />

              </div>

            </Link>



          </div>
        )
      }
      <div className=''>
        <Search />
      </div>

      <div>
        <div className='text-blue-400 animate-bounce'>
          <Booking/>
        </div>
        <div>
          <p className='animate-ping text-xs'>jungle</p>
        </div>
      </div>

      <div>

        <button className='lg:hidden text-slate-600 ' onClick={handleMobileUser}>
            <RxAvatar size={26}/>
        </button>
        <div>
        <div className='hidden lg:flex items-center gap-4'>
          {
            user?._id ? (

              <div className='relative'>
                <div onClick={() => setUserMenu(preve => !preve)} className='flex items-center gap-1 cursor-pointer select-none'>
                  <p>Account</p>
                  {
                    openUserMenu ? (

                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )
                  }
                </div>
                {
                  openUserMenu && (

                    <div className='absolute right-0 top-14'>
                      <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )
                }
            /

              </div>
            ) : (
              
              <button onClick={redirectToLoginPage} className='hover:cursor-pointer'>
              Login
                </button>
              
             
            )
         }
          <div className=' items-center gap-5'>
{/* 
          <div className='relative'>
                <div onClick={() => setUserMenu(preve => !preve)} className='flex items-center gap-1 cursor-pointer select-none'>
                  <p>Account</p>
                  {
                    openUserMenu ? (

                      <FaAngleUp />
                    ) : (
                      <FaAngleDown />
                    )
                  }
                </div>
                {
                  openUserMenu && (

                    <div className='absolute right-0 top-14'>
                      <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )
                }

              </div> */}

            <button onClick={()=>SetOpenCart(true)} className='flex items-center gap-1 bg-green-700 hover:bg-green-900 rounded py-1 px-2 text-white hover:cursor-pointer'>
              <div className='animate-bounce'>
                <GiShoppingCart size={22} />
              </div>
              <div className='font-semibold'>
                {
                  CartItem[0] ? (
                    <div>
                        {/* <p>{CartItem.length} Items</p> */}
                        <p>{totalQty} Items</p>
                        <p>{Pricecurrency(totalPrice)}</p>
                      </div>
                  ) : (
                    
                    <p>myCart</p>
                  )
                }
                

              </div>
            </button>
          
          </div>

        </div>
        </div>
      </div>
        
        {
          openCart && (
            <CartItemDisplay close={()=>SetOpenCart(false)}/>
          )
        }

    </header>
  )
}

export default Header
