import React from 'react'
import { useSelector } from 'react-redux'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DiscoutPrice } from '../utils/DiscountPrice'
import { Pricecurrency } from '../utils/Pricecurrency'

import { useNavigate } from 'react-router-dom'

const MyOrder = () => {


  const { totalPrice, totalQty } = useGlobalContext()
  const cartItem = useSelector(state => state?.cartItem?.cart)
  const navigate = useNavigate()

  const redirectCashOutPage =()=>{
    navigate("/cashout")
    return
  }

  return (
    <section className='bg-slate-300'>
    <div className='container mx-auto p-4'>
      <div >
        <h3 className='text-lg font-semibold '></h3>
        <div className='h-16 py-4 bg-blue-100 border-none flex  justify-center item-center'>
          my order page
        </div>

      </div>

      <div className='gap-4'>
        {
          cartItem[0] && (
            cartItem?.map((item, index) => {
              return (
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
                    <p>{Pricecurrency(DiscoutPrice(item?.productId?.price, item?.productId?.discount))}</p>

                  </div>

                </div>
              )
            })
          )
        }
      </div>

      <div>
        <div className='py-6 flex justify-between item-center bg-green-300 rounded px-4' >

          <p>TOTAL     {Pricecurrency(totalPrice)}</p>
          <button onClick={redirectCashOutPage} className='bg-green-600 rounded text-white text-lg'>
            Cash Out
          </button>
        </div>
      </div>

    </div>
  </section>
  )
}

export default MyOrder
